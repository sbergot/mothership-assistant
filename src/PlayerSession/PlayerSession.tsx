import { CharacterSheet } from "CharacterSheet";
import { ReadWriteCharacter } from "CharacterSheet/types";
import { MessagePanel } from "Messages/MessagePanel";
import {
  AnyMessage,
  GameMessage,
  StampedMessage,
  SyncMessage,
} from "Messages/types";
import Peer, { DataConnection } from "peerjs";
import { useEffect, useState } from "react";
import { Character } from "Rules/types";
import { useLog } from "Services/messageServices";

let peerRef: Peer | null = null;
let connRef: DataConnection | null = null;

function usePlayerConnection(sessionCode: string, character: Character) {
  const [messages, setMessages] = useState<StampedMessage[]>([]);

  function initialize() {
    // Create own peer object with connection to shared PeerJS server
    let peer = new Peer();

    peerRef = peer;

    peer.on("open", function (id) {
      console.log("ID: " + peer.id);
    });
    peer.on("connection", function (c) {
      // Disallow incoming connections
      c.on("open", function () {
        c.send("Sender does not accept incoming connections");
        setTimeout(function () {
          c.close();
        }, 500);
      });
    });
    peer.on("disconnected", function () {
      console.log("Connection lost. Please reconnect");
      peer.reconnect();
    });
    peer.on("close", function () {
      peerRef = null;
      console.log("Peer destroyed. Please refresh");
    });
    peer.on("error", function (err) {
      console.log(err);
    });
  }

  function join(serverId: string) {
    // Close old connection
    if (connRef) {
      console.log("closing previous connection");
      connRef.close();
    }

    // Create connection to destination peer specified in the input field
    let conn = peerRef!.connect(serverId, {
      reliable: true,
    });
    connRef = conn;

    conn.on("open", function () {
      console.log("Connected to: " + conn.peer);

      log({
        type: "SimpleMessage",
        props: { content: `${character.name} joined the session` },
      });

      syncLog({ type: "UpdateChar", props: { character } });
      syncLog({ type: "MessageHistoryRequest", props: {} });
    });
    // Handle incoming data (messages only since this is the signal sender)
    conn.on("data", function (data) {
      console.log("data received", data);
      const typeData = data as AnyMessage;
      if (typeData.type === "UpdateChar") {
        return;
      }
      if (typeData.type === "MessageHistoryRequest") {
        return;
      }
      if (typeData.type === "MessageHistoryResponse") {
        setMessages(typeData.props.messages);
        return;
      }
      setMessages((m) => [...m, typeData]);
    });
    conn.on("close", function () {
      console.log("Connection closed");
      connRef = null;
    });
  }

  function getNow(): string {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    const nowLocal = new Date(now.getTime() - offset * 60 * 1000);
    return nowLocal.toISOString().split(".")[0];
  }

  function stamp(m: GameMessage): StampedMessage {
    return {
      ...m,
      author: character.name,
      time: getNow(),
    };
  }

  function log(m: GameMessage) {
    if (connRef) {
      connRef.send(stamp(m));
    }
  }

  function syncLog(m: SyncMessage) {
    if (connRef) {
      connRef.send(m);
    }
  }

  useEffect(() => {
    initialize();
    setTimeout(() => join(sessionCode), 1000);
  }, []);

  return { log, messages };
}

interface Props extends ReadWriteCharacter {
  sessionCode: string;
}

export function PlayerSession({ character, setCharacter, sessionCode }: Props) {
  const { log, messages } = usePlayerConnection(sessionCode, character);
  return (
    <div className="flex gap-2">
      <div className="max-w-3xl w-full">
        <CharacterSheet
          character={character}
          setCharacter={setCharacter}
          log={log}
        />
      </div>
      <MessagePanel messages={messages} />
    </div>
  );
}
