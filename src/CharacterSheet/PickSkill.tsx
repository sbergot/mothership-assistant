import { always } from "Rules/skillFilters";
import { SelectSkill } from "UI/Organisms/SelectSkills";
import { ReadCharacter, SetMode } from "./types";

type Props = ReadCharacter & SetMode;

export function PickSkill({ character, setMode }: Props) {
  return (
    <SelectSkill
      character={character}
      filter={always}
      onSelect={(skill) => {
        setMode({ mode: "StartTrainingSkill", skill });
      }}
    />
  );
}
