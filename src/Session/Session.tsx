import { CharacterSheet } from "CharacterSheet";
import { ReadWriteCharacter } from "CharacterSheet/types";
import { useState } from "react";
import { Message } from "./types";

interface Props extends ReadWriteCharacter {}

export function Session({ character, setCharacter }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);

  function log(m: Message) {
    setMessages((ms) => [...ms, m]);
  }

  return (
    <div className="flex gap-2">
      <div className="max-w-2xl">
        <CharacterSheet character={character} setCharacter={setCharacter} log={log} />
      </div>
        <div className="max-w-xl w-full h-screen sticky top-2 border-2 rounded-3xl p-4 mb-2 border-mother-5">
          {messages.map((m) => {
            const Comp = m.content;
            return (
              <div>
                <Comp />
              </div>
            );
          })}
        </div>
    </div>
  );
}
