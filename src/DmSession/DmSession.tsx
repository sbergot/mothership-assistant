import { MessagePanel } from "Messages/MessagePanel";
import { Character, Game } from "Rules/types";
import { useLog } from "Services/messageServices";
import { DmSheet } from "./DmSheet";

interface Props {
  game: Game;
  setGame(setter: (c: Game) => Game): void;
  characters: Character[];
}

export function DmSession({ game, setGame, characters }: Props) {
  const { messages, log } = useLog("Warden");

  return (
    <div className="flex gap-2">
      <div className="max-w-2xl w-full">
        <DmSheet game={game} setGame={setGame} characters={characters} />
      </div>
      <MessagePanel messages={messages} />
    </div>
  );
}
