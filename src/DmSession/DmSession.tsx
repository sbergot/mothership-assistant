import { MessagePanel } from "Messages/MessagePanel";
import { Character, Game } from "Rules/types";
import { useLog } from "Services/messageServices";
import { DmSheet } from "./DmSheet";
import { Peer } from "peerjs";
import { useEffect, useState } from "react";
import { Title } from "UI/Atoms";

interface Props {
  game: Game;
  setGame(setter: (c: Game) => Game): void;
  characters: Character[];
}

export function DmSession({ game, setGame, characters }: Props) {
  const { messages, log } = useLog("Warden");
  const [sessionCode, setSessionCode] = useState("");

  useEffect(() => {
    const peer = new Peer();
    peer.on("open", (id) => {
      console.log("peer opened. Id=" + id);
      setSessionCode(id);
    })
    peer.on("connection", (conn) => {
      conn.on("data", (data) => {
        console.log(data);
      });
      conn.on("open", () => {
        console.log("new connection")
        conn.send("hello!");
      });
      conn.on("close", () => {
        console.log("connection closed")
      })
    });
    peer.on("close", () => {
      console.log("peer closed")
    })
  }, []);

  return (
    <div className="flex gap-2">
      <div className="max-w-2xl w-full">
        <Title>{sessionCode}</Title>
        <DmSheet game={game} setGame={setGame} characters={characters} />
      </div>
      <MessagePanel messages={messages} />
    </div>
  );
}
