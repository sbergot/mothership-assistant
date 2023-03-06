import { Character } from "Rules/types";
import { Armor } from "./Armor";
import { Contractors } from "./Contractors";
import { Equipment } from "./Equipment";
import { Identity } from "./Identity";
import { Saves } from "./Saves";
import { Skills } from "./Skills";
import { Stats } from "./Stats";
import { Status } from "./Status";
import { Weapons } from "./Weapons";

interface Props {
  character: Character;
  setCharacter(setter: (c: Character) => Character): void;
}

export function CharacterSheet({ character, setCharacter }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <Identity character={character} setCharacter={setCharacter} />
      <Status character={character} />
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
