import { ReadCharacter, SetMode } from "CharacterSheet/types";
import { always } from "Rules/skillFilters";
import { SelectSkill } from "UI/Organisms/SelectSkills";

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
