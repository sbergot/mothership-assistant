import { Armor, BaseCharacter, Character, ConditionType, Contractor, Equipment, SkillType, Weapon } from "Rules/types";

export interface ReadCharacter {
  character: Character;
}

export interface WriteCharacter {
  setCharacter(setter: (c: Character) => Character): void;
}

export type ReadWriteCharacter = ReadCharacter & WriteCharacter;

export interface ReadBaseChar {
  character: BaseCharacter;
}

export interface WriteBaseChar {
  setCharacter(setter: (c: BaseCharacter) => BaseCharacter): void;
}

export type ReadWriteBaseChar = ReadBaseChar & WriteBaseChar;

export interface Wallet {
  credits: number;
  pay(amount: number): void;
}

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

interface ViewContractorMode {
  mode: "ViewContractor"
  contractor: Contractor
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
  | ViewEquipmentMode
  | ViewContractorMode;

export interface SetMode {
  setMode(mode: Modes): void;
}
