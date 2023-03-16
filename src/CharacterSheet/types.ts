import { Armor, Character, ConditionType, Equipment, SkillType, Weapon } from "Rules/types";

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

interface ViewSkillMode {
  mode: "ViewSkill";
  skill: SkillType;
}

interface AddWeaponMode {
  mode: "AddWeapon";
}

interface AddArmorMode {
  mode: "AddArmor";
}

interface AddEquipmentMode {
  mode: "AddEquipment"
}

interface AddCustomItemMode {
  mode: "AddCustomItem"
}

interface AddContractorMode {
  mode: "AddContractor"
}

interface ViewWeaponMode {
  mode: "ViewWeapon"
  weapon: Weapon
}

interface ViewArmorMode {
  mode: "ViewArmor"
  armor: Armor
}

interface ViewEquipmentMode {
  mode: "ViewEquipment"
  equipment: Equipment
}

export type Modes =
  | CharacterSheetMode
  | AddConditionMode
  | ViewConditionMode
  | SelectSkillMode
  | StartTrainingSkillMode
  | TrainSkillMode
  | ViewSkillMode
  | AddWeaponMode
  | AddArmorMode
  | AddEquipmentMode
  | AddCustomItemMode
  | AddContractorMode
  | ViewWeaponMode
  | ViewArmorMode
  | ViewEquipmentMode;

export interface SetMode {
  setMode(mode: Modes): void;
}
