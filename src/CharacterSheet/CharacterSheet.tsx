import { Character } from "../Rules/types";
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
}

export function CharacterSheet({ character }: Props) {
  return (
    <>
      <Identity character={character} />
      <Status character={character} />
      <Stats character={character} />
      <Saves character={character} />
      <Skills character={character} />
      <Weapons character={character} />
      <Armor character={character} />
      <Equipment character={character} />
      <Contractors character={character} />
    </>
  );
}
