import { Armor } from "./Armor";
import { Equipment } from "./Equipment";
import { Identity } from "./Identity";
import { Saves } from "./Saves";
import { Skills } from "./Skills";
import { Stats } from "./Stats";
import { Status } from "./Status";
import { Weapons } from "./Weapons";

export function CharacterSheet() {
  return (
    <>
      <Identity />
      <Status />
      <Stats />
      <Saves />
      <Skills />
      <Weapons />
      <Armor />
      <Equipment />
    </>
  );
}
