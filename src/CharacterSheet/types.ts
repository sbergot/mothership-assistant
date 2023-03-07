import { Character, ConditionType, SkillType } from "Rules/types";

export interface ReadCharacter {
  character: Character;
}

export interface WriteCharacter {
  setCharacter(setter: (c: Character) => Character): void;
}

export type ReadWriteCharacter = ReadCharacter & WriteCharacter;

export interface Cancel {
  onCancel(): void;
}

interface CharacterSheetMode {
  mode: "CharacterSheet";
}

interface AddConditionMode {
  mode: "AddCondition";
}

interface ViewConditionMode {
  mode: "ViewCondition";
  condition: ConditionType;
}

interface SelectSkillMode {
  mode: "SelectSkill";
}

interface StartTrainingSkillMode {
  mode: "StartTrainingSkill";
  skill: SkillType;
}

interface TrainSkillMode {
  mode: "TrainSkill";
}

export type Modes = CharacterSheetMode | AddConditionMode | ViewConditionMode | SelectSkillMode | StartTrainingSkillMode | TrainSkillMode;

export interface SetMode {
  setMode(mode: Modes): void;
}
