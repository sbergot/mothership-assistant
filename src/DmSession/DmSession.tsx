import { MessagePanel } from "Messages/MessagePanel";
import { Character, Game } from "Rules/types";
import { useLog } from "Services/messageServices";
import { DmSheet } from "./DmSheet";
import { DataConnection, Peer } from "peerjs";
import { useEffect, useState } from "react";
import { Title } from "UI/Atoms";
import { StampedMessage } from "Messages/types";

interface Props {
  game: Game;
  setGame(setter: (c: Game) => Game): void;
  characters: Character[];
}

let connections: DataConnection[] = [];

function useDmConnection() {
  const [sessionCode, setSessionCode] = useState("");
  const [messages, setMessages] = useState<StampedMessage[]>([])

  function initialize() {
    // Create own peer object with connection to shared PeerJS server
    const peer = new Peer();

    peer.on("open", function (id) {
      console.log("peer connected with id: " + peer.id);
      connections = [];
      setSessionCode(id);
    });

    peer.on("connection", function (c) {
      console.log("Peer connected");
      ready(c);
    });
    peer.on("disconnected", function () {
      console.log("Connection lost. Please reconnect");
    });
    peer.on("close", function () {
      console.log("Peer destroyed");
      connections = [];
    });
    peer.on("error", function (err) {
      console.log(err);
    });
    function ready(conn: DataConnection) {
      conn.on("data", function (data) {
        console.log("Data recieved", data);
        setMessages(m => ([...m, data as StampedMessage]))
        connections.forEach((c) => {
          c.send(data);
        })
      });
      conn.on("close", function () {
        console.log("Connection destroyed");
      });
      connections.push(conn);
    }
  }

  useEffect(() => {
    initialize();
  }, []);

  return { sessionCode, messages };
}

export function DmSession({ game, setGame, characters }: Props) {
  const { log } = useLog("Warden");

  const { sessionCode, messages } = useDmConnection();

  return (
    <div className="flex gap-2">
      <div className="max-w-2xl w-full">
        <Title>
          <span className="normal-case">{sessionCode}</span>
        </Title>
        <DmSheet game={game} setGame={setGame} characters={characters} />
      </div>
      <MessagePanel messages={messages} />
    </div>
  );
}
