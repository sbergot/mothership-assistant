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
    setSessionCode(peer.id);
    peer.on("connection", (conn) => {
      conn.on("data", (data) => {
        // Will print 'hi!'
        console.log(data);
      });
      conn.on("open", () => {
        conn.send("hello!");
      });
    });
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
