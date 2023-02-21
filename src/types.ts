export type CharacterClass = "marine" | "teamster" | "android" | "scientist"

export type SkillType = "tata";

export type ArmorType = "standardBattleDress";

export type ArmorSpeedType = "normal";

export type WeaponRangeType = "close";

export type CriticalType = "Gunshot";

export type WeaponType = "Revolver";

export type DamageType = "xd10";

export type RollMode = "advantage";

export type ConditionType = "conditionType";

export type WoundType = "bleeding";

export type ContractorType = "pioneer";

export interface Condition {
  conditionType: ConditionType;
}

interface WithId {
  id: string;
}

export interface Damage {
  "damageType": DamageType,
  "amount": number,
  "rollMode": RollMode
}

export interface Wound {
  "description": string,
  "woundType": WoundType,
  "bleed": number,
  "label": string | null
}

export interface Armor extends WithId {
  "armorType": ArmorType,
  "name": string,
  "equipped": boolean,
  "armorPoints": number,
  "cost": number,
  "oxygenSupply": number,
  "notes": string,
  "armorSpeed": ArmorSpeedType
}

export interface Weapon extends WithId {
  "name": string,
  "equipped": boolean,
  "cost": number,
  "weaponRange": WeaponRangeType,
  "damageString": string,
  "shots": number,
  "magazineSize": number,
  "critical": CriticalType,
  "special": string,
  "weaponType": WeaponType,
  "magazines": number,
  "damage": Damage[],
  "baseType": WeaponType
}

export interface Equipment extends WithId {
  "name": string,
  "description": string,
  "equipped": boolean,
  "quantity": number,
  "cost": number,
  "baseType": string
}

export interface Item extends WithId {
  "title": string,
  "subtitle": string | null,
  "description": string,
  "cost": number,
  "quantity": number
}

export interface BaseCharacter extends WithId {
  "name": string,
  "pronouns": string,
  "wounds": number,
  "maxWounds": number,
  "equipment": Equipment[],
  "armor": Armor[],
  "weapons":Weapon[],
}

export interface Contractor extends BaseCharacter {
  "type":ContractorType,
  "occupation": string,
  "salary":500,
  "combat": number,
  "instinct": number,
  "loyalty": number,
  "motivation": string,
}

export interface Character extends BaseCharacter {
  "characterClass": CharacterClass,
  "strength": number,
  "speed": number,
  "intellect": number,
  "combat": number,
  "sanity": number,
  "fear": number,
  "body": number,
  "stress": number,
  "minStress": number,
  "credits": number,
  "trinket": string,
  "patch": string,
  "traumaResponse": string,
  "highScore": number,
  "bonusStat":null,
  "skillInProgress": null | SkillType,
  "skillTrainingYearsRemaining": number,
  "skillTrainingMonthsRemaining": number,
  "skills": SkillType[],
  "items": Item[],
  "conditions": Condition[],
  "creationComplete": boolean,
  "woundEffects": Wound[],
  "contractors": Contractor[]
}