import { useState } from "react";
import { AddCondition } from "./AddCondition";
import { Armor } from "./Armor";
import { Contractors } from "./Contractors";
import { Equipment } from "./Equipment";
import { Identity } from "./Identity";
import { Saves } from "./Saves";
import { Skills } from "./Skills";
import { Stats } from "./Stats";
import { Status } from "./Status";
import { Modes, ReadWriteCharacter } from "./types";
import { ViewCondition } from "./ViewCondition";
import { Weapons } from "./Weapons";

export function CharacterSheet({
  character,
  setCharacter,
}: ReadWriteCharacter) {
  const [mode, setMode] = useState<Modes>({ mode: "CharacterSheet" });

  if (mode.mode === "AddCondition") {
    return (
      <AddCondition
        character={character}
        setCharacter={setCharacter}
        setMode={setMode}
      />
    );
  }

  if (mode.mode === "ViewCondition") {
    return (
      <ViewCondition
        character={character}
        setCharacter={setCharacter}
        setMode={setMode}
        condition={mode.condition}
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Identity character={character} setCharacter={setCharacter} />
      <Status character={character} setMode={setMode} />
      <Stats character={character} />
      <Saves character={character} />
      <Skills character={character} />
      <Weapons character={character} />
      <Armor character={character} />
      <Equipment character={character} />
      <Contractors character={character} />
    </div>
  );
}
