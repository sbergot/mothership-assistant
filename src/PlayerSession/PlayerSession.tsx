import { CharacterSheet } from "CharacterSheet";
import { Modes, ReadWriteCharacter, SetMode } from "CharacterSheet/types";
import { useBrowserId } from "helpers";
import { MessagePanel } from "Messages/MessagePanel";
import {
  AnyMessage,
  GameMessage,
  Log,
  RevealedElements,
  StampedMessage,
  SyncMessage,
} from "Messages/types";
import Peer, { DataConnection } from "peerjs";
import { useEffect, useRef, useState } from "react";
import { Character, RevealedElement } from "Rules/types";
import { stamp, useLog } from "Services/messageServices";
import { MobileLayout } from "UI/MobileLayout";

type ConnectionStatus =
  | "connecting"
  | "connected"
  | "error"
  | "disconnected"
  | "offline";

function usePlayerConnection(sessionCode: string, character: Character) {
  const browserId = useBrowserId();
  const [messages, setMessages] = useState<StampedMessage[]>([]);
  const [revealedElements, setRevealedElements] = useState<RevealedElement[]>([]);
  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatus>("connecting");
  const debounceRef = useRef(false);
  const peerRef = useRef<Peer | null>(null);
  const connRef = useRef<DataConnection | null>(null);
  const stub = useLog(character.name, character.id);

  function initialize() {
    // Create own peer object with connection to shared PeerJS server
    let peer = new Peer();

    peerRef.current = peer;

    peer.on("open", function (id) {
      console.log("peer connected with id: " + id);
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
      setConnectionStatus("disconnected");
      peer.reconnect();
    });
    peer.on("close", function () {
      peerRef.current = null;
      setConnectionStatus("disconnected");
      console.log("Peer destroyed. Please refresh");
    });
    peer.on("error", function (err) {
      setConnectionStatus("error");
      console.log(err);
    });
  }

  function join(serverId: string) {
    // Close old connection
    if (connRef.current) {
      console.log("closing previous connection");
      setConnectionStatus("disconnected");
      connRef.current.close();
    }

    // Create connection to destination peer specified in the input field
    let conn = peerRef.current!.connect(serverId, {
      reliable: true,
      metadata: { browserId },
    });
    connRef.current = conn;

    conn.on("open", function () {
      console.log("Connected to: " + conn.peer);

      log({
        type: "SimpleMessage",
        props: { content: `${character.name} joined the session` },
        transient: true,
      });

      setConnectionStatus("connected");
      syncLog({ type: "UpdateChar", props: { character } });
      syncLog({ type: "MessageHistoryRequest", props: {} });
      syncLog({ type: "RevealedElementsRequest", props: {} });
    });
    // Handle incoming data (messages only since this is the signal sender)
    conn.on("data", function (data) {
      console.debug("data received", data);
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
      if (typeData.type === "RevealedElementsRequest") {
        return;
      }
      if (typeData.type === "RevealedElementsResponse") {
        setRevealedElements(typeData.props.revealedElements);
        return;
      }
      setMessages((m) => [...m, typeData]);
    });
    conn.on("close", function () {
      console.log("Connection closed");
      setConnectionStatus("disconnected");
      connRef.current = null;
    });
    conn.on("error", (e) => {
      setConnectionStatus("error");
      console.error("connexion error", e);
    });
  }

  function log(m: GameMessage) {
    if (connRef.current) {
      connRef.current.send(stamp(character, m));
    }
  }

  function syncLog(m: SyncMessage) {
    if (connRef.current) {
      connRef.current.send(m);
    }
  }

  useEffect(() => {
    if (!sessionCode) {
      setConnectionStatus("offline");
      return;
    }
    if (debounceRef.current) {
      return;
    }
    debounceRef.current = true;
    initialize();
    setTimeout(() => join(sessionCode), 1000);
  }, []);

  useEffect(() => {
    syncLog({ type: "UpdateChar", props: { character } });
  }, [character]);

  return !!sessionCode
    ? { log, messages, connectionStatus, revealedElements }
    : { log: stub.log, messages: stub.messages, connectionStatus, revealedElements };
}

interface Props extends ReadWriteCharacter {
  sessionCode: string;
}

export function PlayerSession({ character, setCharacter, sessionCode }: Props) {
  const { log, messages, connectionStatus, revealedElements } = usePlayerConnection(
    sessionCode,
    character
  );

  function wrappedSetCharacter(setter: (c: Character) => Character): void {
    function wrappedSetter(oldChar: Character): Character {
      const newChar = setter(oldChar);
      if (newChar.stress > 20 && newChar.stress > oldChar.stress) {
        log({ type: "SimpleMessage", props: { content: "Max stress exceeded! Please reduce stress level to 20. The most relevant stat or save is reduced by the same amount of points." } })
      }
      return newChar;
    }
    setCharacter(wrappedSetter);
  }

  const [mode, setMode] = useState<Modes>({ mode: "CharacterSheet" });
  const playerContext: ReadWriteCharacter & SetMode = {
    character,
    setCharacter: wrappedSetCharacter,
    setMode,
  };

  const commonContext: Log & RevealedElements = { log, revealedElements };

  const leftPart = (
    <>
      {connectionStatus}
      <CharacterSheet
        character={character}
        setCharacter={wrappedSetCharacter}
        log={log}
        mode={mode}
        setMode={setMode}
      />
    </>
  );

  const rightPart = (
    <MessagePanel
      messages={messages}
      authorId={character.id}
      contextType="player"
      commonContext={commonContext}
      playerContext={playerContext}
    />
  );

  return <MobileLayout leftPart={leftPart} rightPart={rightPart} />;
}
