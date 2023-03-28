import { CharacterSheet } from "CharacterSheet";
import { ReadWriteCharacter } from "CharacterSheet/types";
import { MessagePanel } from "Messages/MessagePanel";
import { useLog } from "Services/messageServices";

interface Props extends ReadWriteCharacter {}

export function Session({ character, setCharacter }: Props) {
  const { messages, log } = useLog(character.name);
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
