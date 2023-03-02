import { useEffect, useState } from "react";
import { Block, Button, Button2, Tag, Title } from "../Atoms";
import { allSkillLevels, allSkills, allSkillsDict, classDefinitionsDict } from "../Data/data";
import { Skill } from "../Molecules";
import { toDict } from "../Services/services";
import { Character, CharacterClass, SkillDefinition, SkillLevel, SkillType } from "../types";
import { StepProps } from "./types";

interface SelectSkillProps {
  onSelect(s: SkillType): void;
  filter(s: SkillDefinition): boolean;
}

function SelectSkill({ onSelect, filter }: SelectSkillProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {allSkills.filter(filter).map((s) => (
        <Button key={s.key} onClick={() => onSelect(s.key)}>{s.name}</Button>
      ))}
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
    return prerequisites.some(p => !!selectedDict[p]);
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

function always(s: SkillDefinition) {
  return true;
}

interface SkillSelectionProps {
  character: Character;
  onSelect(s: SkillType): void;
  onFinish(): void;
}

function AndroidSkillSelection({
  onSelect,
  onFinish,
  character,
}: SkillSelectionProps) {
  const [selectedSkills, setSelectedSkills] = useState<SkillType[]>([]);

  useEffect(() => {
    if (selectedSkills.length > 1) {
      onFinish();
    }
    if (
      selectedSkills.length === 1 &&
      allSkillsDict[selectedSkills[0]].level == "Expert"
    ) {
      onFinish();
    }
  }, [selectedSkills]);

  function getFilter(): SkillFilter {
    if (selectedSkills.length === 0) {
      return or(isSkillLevel("Trained"), isSkillLevel("Expert"));
    }
    if (selectedSkills.length === 1) {
      return allSkillsDict[selectedSkills[0]].level == "Trained"
        ? isSkillLevel("Trained")
        : never;
    }
    return never;
  }

  return <SelectSkill
    onSelect={onSelect}
    filter={and(isPrerequisiteOk(character.skills), getFilter())}
  />;
}

function TeamsterSkillSelection({
  onSelect,
  onFinish,
  character,
}: SkillSelectionProps) {
  const [selectedSkills, setSelectedSkills] = useState<SkillType[]>([]);

  useEffect(() => {
    if (selectedSkills.length > 1) {
      onFinish();
    }
  }, [selectedSkills]);

  function getFilter(): SkillFilter {
    if (selectedSkills.length === 0) {
      return isSkillLevel("Trained");
    }
    if (selectedSkills.length === 1) {
      return isSkillLevel("Expert");
    }
    return never;
  }

  return <SelectSkill
    onSelect={onSelect}
    filter={and(isPrerequisiteOk(character.skills), getFilter())}
  />;
}

const scientistSkills: Record<SkillLevel, number> = {
  Trained: 2,
  Expert: 1,
  Master: 1
}

function ScientistSkillSelection({
  onSelect,
  onFinish,
  character,
}: SkillSelectionProps) {

  let remaining : Record<SkillLevel, number> = scientistSkills;
  character.skills.forEach(skill => {
    const level = allSkillsDict[skill].level;
    remaining = {...remaining, [level]: remaining[level] - 1};
  });

  useEffect(() => {
    if (Object.values(remaining).every(v => v === 0)) {
      onFinish();
    }
  }, [character]);

  function getFilter(): SkillFilter {
    let filter = never;
    allSkillLevels.forEach(s => {
      if (remaining[s] > 0) {
        filter = or(filter, isSkillLevel(s));
      }
    })
    return filter;
  }

  function internalOnSelect(skill: SkillType) {
    onSelect(skill);
  }

  return <SelectSkill
    onSelect={internalOnSelect}
    filter={and(isPrerequisiteOk(character.skills), getFilter())}
  />;
}

function MarineSkillSelection({
  onSelect,
  onFinish,
  character,
}: SkillSelectionProps) {
  const [remaining, setRemaining] = useState<Record<SkillLevel, number>>({
    Trained: 1,
    Expert: 1,
    Master: 0
  });

  useEffect(() => {
    setRemaining({
      Trained: 1,
      Expert: 1,
      Master: 0
    })
  }, [character]);

  useEffect(() => {
    if (Object.values(remaining).every(v => v === 0)) {
      onFinish();
    }
  }, [remaining]);

  function getFilter(): SkillFilter {
    let filter = never;
    allSkillLevels.forEach(s => {
      if (remaining[s] > 0) {
        filter = or(filter, isSkillLevel(s));
      }
    })
    return filter;
  }

  function internalOnSelect(skill: SkillType) {
    const level = allSkillsDict[skill].level
    setRemaining(r => ({...r, [level]: r[level] - 1}))
    onSelect(skill);
  }

  return <SelectSkill
    onSelect={internalOnSelect}
    filter={and(isPrerequisiteOk(character.skills), getFilter())}
  />;
}

const selectors: Record<CharacterClass, (props: SkillSelectionProps) => JSX.Element> = {
  android: AndroidSkillSelection,
  marine: MarineSkillSelection,
  scientist: ScientistSkillSelection,
  teamster: TeamsterSkillSelection
}

export function SelectSkills({ character, onConfirm }: StepProps) {
  const [newCharacter, setCharacter] = useState({ ...character });
  const [done, setDone] = useState(false);
  const { characterClass } = newCharacter;
  const Selector = selectors[characterClass];

  return (
    <div className="flex flex-col">
      <Block variant="light">
        <Title>7. Note class skills and choose bonus skills</Title>
        <div className="rounded-xl bg-mother-4 text-mother-1 flex flex-col gap-2 pb-2 cursor-pointer">
          <div className="rounded-3xl bg-mother-6 text-center relative">
            {characterClass}
          </div>
          <div className="px-4 text-base">
            <div className="flex flex-col gap-1">
              {classDefinitionsDict[characterClass].initialSkills.map(
                (line) => (
                  <div>{line}</div>
                )
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {newCharacter.skills.map((s) => (
            <Skill skill={allSkillsDict[s]} />
          ))}
        </div>
        <Selector
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
