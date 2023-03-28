import { MessagePanel } from "Messages/MessagePanel";
import { Character, Game } from "Rules/types";
import { useLog } from "Services/messageServices";
import { DmSheet } from "./DmSheet";

interface Props {
  game: Game;
  characters: Character[];
}

export function DmSession({ game, characters }: Props) {
  const { messages, log } = useLog("Warden");

  return (
    <div className="flex gap-2">
      <div className="max-w-2xl">
        <DmSheet game={game} characters={characters} />
      </div>
      <MessagePanel messages={messages} />
    </div>
  );
}
