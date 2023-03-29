import { MessagePanel } from "Messages/MessagePanel";
import { Character, Game } from "Rules/types";
import { DmSheet } from "./DmSheet";
import { DataConnection, Peer } from "peerjs";
import { useEffect, useState } from "react";
import { Title } from "UI/Atoms";
import { AnyMessage, StampedMessage, SyncMessage } from "Messages/types";

interface Props {
  game: Game;
  setGame(setter: (c: Game) => Game): void;
}

let connections: DataConnection[] = [];
let messagesRef: StampedMessage[] = [];

function useDmConnection() {
  const [sessionCode, setSessionCode] = useState("");
  const [messages, setMessages] = useState<StampedMessage[]>([]);
  const [characters, setCharacters] = useState<Record<string, Character>>({});
  messagesRef = messages;

  function initialize() {
    const peer = new Peer();
    connections = [];

    peer.on("open", function (id) {
      console.log("peer connected with id: " + peer.id);
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
        const typeData = data as AnyMessage;
        if (typeData.type === "UpdateChar") {
          const newChar = typeData.props.character;
          setCharacters((cs) => ({ ...cs, [newChar.id]: newChar }));
          return;
        }
        if (typeData.type === "MessageHistoryRequest") {
          const response: SyncMessage = {
            type: "MessageHistoryResponse",
            props: { messages: messagesRef },
          };
          conn.send(response);
          return;
        }
        if (typeData.type === "MessageHistoryResponse") {
          return;
        }
        setMessages((m) => [...m, typeData]);
        connections.forEach((c) => {
          c.send(typeData);
        });
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

  return { sessionCode, messages, characters };
}

export function DmSession({ game, setGame }: Props) {
  const { sessionCode, messages, characters } = useDmConnection();

  return (
    <div className="flex gap-2">
      <div className="max-w-2xl w-full">
        <Title>
          <span className="normal-case">{sessionCode}</span>
        </Title>
        <DmSheet
          game={game}
          setGame={setGame}
          characters={Object.values(characters)}
        />
      </div>
      <MessagePanel messages={messages} />
    </div>
  );
}
