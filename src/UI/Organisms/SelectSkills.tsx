import { Button, Title } from "UI/Atoms";
import {
  allSkills,
} from "Rules/data";
import { Character, SkillDefinition, SkillType } from "Rules/types";
import { and, isNotSelected, isPrerequisiteOk, isSkillLevel } from "Rules/skillFilters";

interface SelectSkillProps {
  character: Character;
  onSelect(s: SkillType): void;
  filter(s: SkillDefinition): boolean;
}

export function SelectSkill({ onSelect, filter, character }: SelectSkillProps) {
  const fullFilter = and(
    isNotSelected(character.skills),
    and(isPrerequisiteOk(character.skills), filter));
  const filteredSkills = allSkills.filter(fullFilter);
  const trainedSkills = filteredSkills.filter(isSkillLevel("Trained"));
  const expertSkills = filteredSkills.filter(isSkillLevel("Expert"));
  const masterSkills = filteredSkills.filter(isSkillLevel("Master"));
  return (
    <div className="flex flex-col gap-2">
      {trainedSkills.length > 0 && (
        <>
          <Title>Trained skills</Title>
          <div className="flex flex-wrap gap-2">
            {trainedSkills.map((s) => (
              <Button key={s.key} onClick={() => onSelect(s.key)}>
                {s.name}
              </Button>
            ))}
          </div>
        </>
      )}
      {expertSkills.length > 0 && (
        <>
          <Title>Expert skills</Title>
          <div className="flex flex-wrap gap-2">
            {expertSkills.map((s) => (
              <Button key={s.key} onClick={() => onSelect(s.key)}>
                {s.name}
              </Button>
            ))}
          </div>
        </>
      )}
      {masterSkills.length > 0 && (
        <>
          <Title>Master skills</Title>
          <div className="flex flex-wrap gap-2">
            {masterSkills.map((s) => (
              <Button key={s.key} onClick={() => onSelect(s.key)}>
                {s.name}
              </Button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

