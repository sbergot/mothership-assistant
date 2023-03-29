import { CharacterSheet } from "CharacterSheet";
import { ReadWriteCharacter } from "CharacterSheet/types";
import { MessagePanel } from "Messages/MessagePanel";
import Peer, { DataConnection } from "peerjs";
import { useEffect, useState } from "react";
import { useLog } from "Services/messageServices";

function useConnection() {
  let peerRef: Peer | null = null;
  let connRef: DataConnection | null = null;
  function initialize() {
    // Create own peer object with connection to shared PeerJS server
    let peer = new Peer(null!, {
      debug: 2,
    });

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
      connRef = null;
      console.log("Connection destroyed. Please refresh");
    });
    peer.on("error", function (err) {
      console.log(err);
      alert("" + err);
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

      conn.send("hi!");
    });
    // Handle incoming data (messages only since this is the signal sender)
    conn.on("data", function (data) {
      console.log("data received: " + data);
    });
    conn.on("close", function () {
      console.log("Connection closed");
    });
  }

  return { initialize, join };
}

interface Props extends ReadWriteCharacter {
  sessionCode: string;
}

export function PlayerSession({ character, setCharacter, sessionCode }: Props) {
  const { messages, log } = useLog(character.name);
  const [peerId, setPeerId] = useState("");

  useEffect(() => {
    const { initialize, join } = useConnection();
    initialize();
    setTimeout(() => join(sessionCode), 1000);
  }, []);

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
