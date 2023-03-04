import { useEffect, useState } from "react";
import { Block, Button, Button2, Title } from "../Atoms";
import {
  allSkillLevels,
  allSkills,
  allSkillsDict,
  classDefinitionsDict,
} from "../Data/data";
import { BlockWithTitle, Skill } from "../Molecules";
import { toDict } from "../Services/services";
import { Character, SkillDefinition, SkillLevel, SkillType } from "../types";
import { StepProps } from "./types";

interface SelectSkillProps {
  onSelect(s: SkillType): void;
  filter(s: SkillDefinition): boolean;
}

function SelectSkill({ onSelect, filter }: SelectSkillProps) {
  const filteredSkills = allSkills.filter(filter);
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

type SkillFilter = (s: SkillDefinition) => boolean;

function isPrerequisiteOk(selectedSkills: SkillType[]): SkillFilter {
  const selectedDict = toDict(selectedSkills, (s) => s);
  return (s: SkillDefinition) => {
    const { prerequisites } = allSkillsDict[s.key];
    if (prerequisites.length === 0) {
      return true;
    }
    return prerequisites.some((p) => !!selectedDict[p]);
  };
}

function isNotSelected(selectedSkills: SkillType[]): SkillFilter {
  const selectedDict = toDict(selectedSkills, (s) => s);
  return (s: SkillDefinition) => {
    return !selectedDict[s.key];
  };
}

function isSkillLevel(level: SkillLevel): SkillFilter {
  return (s: SkillDefinition) => s.level === level;
}

function and(cb1: SkillFilter, cb2: SkillFilter): SkillFilter {
  return (s: SkillDefinition) => cb1(s) && cb2(s);
}

function or(cb1: SkillFilter, cb2: SkillFilter): SkillFilter {
  return (s: SkillDefinition) => cb1(s) || cb2(s);
}

function never(s: SkillDefinition) {
  return false;
}

interface SkillSelectionProps {
  character: Character;
  onSelect(s: SkillType): void;
  onFinish(): void;
}

function getSkillsBudget(character: Character): Record<SkillLevel, number> {
  if (character.characterClass === "teamster") {
    return {
      Trained: 3,
      Expert: 1,
      Master: 0,
    };
  }
  if (character.characterClass === "scientist") {
    return {
      Trained: 2,
      Expert: 1,
      Master: 1,
    };
  }

  // case for marine & android. Pick 2 trained or 1 expert
  const skillNbrByLevel = computeSkillNbrByLevel(character);
  const preselectedSkillsNbr = character.characterClass === "marine" ? 2 : 3;

  // no bonus skill selected
  if (
    skillNbrByLevel.Trained === preselectedSkillsNbr &&
    skillNbrByLevel.Expert === 0
  ) {
    return {
      Trained: preselectedSkillsNbr + 1,
      Expert: 1,
      Master: 0,
    };
  }
  // one or more trained skill selected
  if (
    skillNbrByLevel.Trained > preselectedSkillsNbr &&
    skillNbrByLevel.Expert === 0
  ) {
    return {
      Trained: preselectedSkillsNbr + 2,
      Expert: 0,
      Master: 0,
    };
  }
  // one expert skill selected
  if (
    skillNbrByLevel.Trained === preselectedSkillsNbr &&
    skillNbrByLevel.Expert === 1
  ) {
    return {
      Trained: preselectedSkillsNbr,
      Expert: 1,
      Master: 0,
    };
  }

  throw new Error("impossible");
}

function SkillSelection({
  onSelect,
  onFinish,
  character,
}: SkillSelectionProps) {
  const budget = getSkillsBudget(character);
  const remaining: Record<SkillLevel, number> = computeRemaining(
    budget,
    character
  );

  useEffect(() => {
    if (Object.values(remaining).every((v) => v === 0)) {
      onFinish();
    }
  }, [character]);

  function getFilter(): SkillFilter {
    let isInBudget = never;
    allSkillLevels.forEach((s) => {
      if (remaining[s] > 0) {
        isInBudget = or(isInBudget, isSkillLevel(s));
      }
    });
    return and(
      isNotSelected(character.skills),
      and(isPrerequisiteOk(character.skills), isInBudget)
    );
  }

  return <SelectSkill onSelect={onSelect} filter={getFilter()} />;
}

function computeRemaining(
  budget: Record<SkillLevel, number>,
  character: Character
) {
  let remaining: Record<SkillLevel, number> = budget;
  character.skills.forEach((skill) => {
    const level = allSkillsDict[skill].level;
    remaining = { ...remaining, [level]: remaining[level] - 1 };
  });
  return remaining;
}

function computeSkillNbrByLevel(character: Character) {
  let skillNbrByLevel: Record<SkillLevel, number> = {
    Trained: 0,
    Expert: 0,
    Master: 0,
  };
  character.skills.forEach((skill) => {
    const level = allSkillsDict[skill].level;
    skillNbrByLevel = {
      ...skillNbrByLevel,
      [level]: skillNbrByLevel[level] + 1,
    };
  });
  return skillNbrByLevel;
}

export function SelectSkills({ character, onConfirm }: StepProps) {
  const [newCharacter, setCharacter] = useState({ ...character });
  const [done, setDone] = useState(false);
  const { characterClass } = newCharacter;

  return (
    <div className="flex flex-col">
      <Block variant="light">
        <Title>7. Note class skills and choose bonus skills</Title>
        <BlockWithTitle title={characterClass}>
          {classDefinitionsDict[characterClass].initialSkills.map((line) => (
            <div>{line}</div>
          ))}
        </BlockWithTitle>
        <div className="flex flex-wrap gap-2 mt-2">
          {newCharacter.skills.map((s) => (
            <Skill skill={allSkillsDict[s]} />
          ))}
        </div>
        <SkillSelection
          character={newCharacter}
          onSelect={(s) =>
            setCharacter((c) => ({ ...c, skills: [...c.skills, s] }))
          }
          onFinish={() => setDone(true)}
        />
      </Block>
      <div className="self-center">
        <div className="flex items-center gap-4">
          <Button2 onClick={() => setCharacter({ ...character })}>
            Reset
          </Button2>
          <Button2 disabled={!done} onClick={() => onConfirm(newCharacter)}>
            Confirm
          </Button2>
        </div>
      </div>
    </div>
  );
}
