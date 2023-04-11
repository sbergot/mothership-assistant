import { useEffect, useState } from "react";
import { Block, Button, Title } from "UI/Atoms";
import {
  allSkillLevels,
  allSkillsDict,
  classDefinitionsDict,
} from "Rules/data";
import { BlockWithTitle, Skill } from "UI/Molecules";
import { Character, SkillLevel, SkillType } from "Rules/types";
import { StepProps } from "./types";
import {
  isSkillLevel,
  SkillFilter,
  never,
  or,
} from "Rules/skillFilters";
import { SelectSkill } from "UI/Organisms/SelectSkills";

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
    return isInBudget;
  }

  return (
    <SelectSkill
      onSelect={onSelect}
      filter={getFilter()}
      character={character}
    />
  );
}

function computeRemaining(
  budget: Record<SkillLevel, number>,
  character: Character
) {
  let remaining: Record<SkillLevel, number> = budget;
  character.skills.forEach((skill) => {
    const level = allSkillsDict[skill.type].level;
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
    const level = allSkillsDict[skill.type].level;
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
          {classDefinitionsDict[characterClass].initialSkills.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </BlockWithTitle>
        <div className="flex flex-wrap gap-2 mt-2">
          {newCharacter.skills.map((s) => (
            <Skill skill={allSkillsDict[s.type]} />
          ))}
        </div>
        <SkillSelection
          character={newCharacter}
          onSelect={(s) =>
            setCharacter((c) => ({ ...c, skills: [...c.skills, { type: s, lossOfConfidence: false }] }))
          }
          onFinish={() => setDone(true)}
        />
      </Block>
      <div className="self-center">
        <div className="flex items-center gap-4">
          <Button rounded dark onClick={() => setCharacter({ ...character })}>
            Reset
          </Button>
          <Button rounded dark disabled={!done} onClick={() => onConfirm(newCharacter)}>
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}
