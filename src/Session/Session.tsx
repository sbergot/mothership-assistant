import { CharacterSheet } from "CharacterSheet";
import { ReadWriteCharacter } from "CharacterSheet/types";
import { ShowMessage } from "Messages/ShowMessage";
import { useLog } from "Services/messageServices";
import { Block } from "UI/Atoms";

interface Props extends ReadWriteCharacter {}

export function Session({ character, setCharacter }: Props) {
  const { messages, log } = useLog(character);
  return (
    <div className="flex gap-2">
      <div className="max-w-2xl">
        <CharacterSheet character={character} setCharacter={setCharacter} log={log} />
      </div>
        <div className="max-w-xl w-full h-screen sticky top-2 border-2 rounded-3xl p-4 mb-2 border-mother-5 flex flex-col gap-2">
          {messages.map((m) => {
            return (
              <Block variant="light">
              <div>
                <div className="text-sm text-mother-4">{m.author} - {m.time}</div>
                <ShowMessage message={m} />
              </div>
              </Block>
            );
          })}
        </div>
    </div>
  );
}
