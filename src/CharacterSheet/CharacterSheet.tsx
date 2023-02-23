import { Identity } from "./Identity";
import { Saves } from "./Saves";
import { Skills } from "./Skills";
import { Stats } from "./Stats";
import { Status } from "./Status";

export function CharacterSheet() {
  return (
    <>
      <Identity />
      <Status />
      <Stats />
      <Saves />
      <Skills />
    </>
  );
}
