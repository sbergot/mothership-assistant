export type CharacterClass = "marine" | "teamster" | "android" | "scientist";

export type StatType = "strength" | "speed" | "intellect" | "combat";
export type SaveType = "sanity" | "fear" | "body";

export type SkillType =
  | "linguistics"
  | "computers"
  | "mathematics"
  | "archaelogy"
  | "rimwise"
  | "art"
  | "athletics"
  | "botany"
  | "chemistry"
  | "geology"
  | "industrialEquipment"
  | "juryRigging"
  | "militaryTraining"
  | "theology"
  | "zeroG"
  | "zoology"
  | "asteroidMining"
  | "ecology"
  | "explosives"
  | "fieldMedicine"
  | "firearms"
  | "hacking"
  | "handToHandCombat"
  | "mechanicalRepair"
  | "mysticism"
  | "pathology"
  | "pharmacology"
  | "physics"
  | "piloting"
  | "psychology"
  | "wildernessSurvival"
  | "ai"
  | "command"
  | "cybernetics"
  | "engineering"
  | "exobiology"
  | "hyperspace"
  | "planetology"
  | "robotics"
  | "sophontology"
  | "surgery"
  | "xenoesoterism";

export type SkillLevel = "Trained" | "Expert" | "Master";

export interface SkillLevelDefinition {
  level: SkillLevel;
  trainingTimeYear: number;
  trainingCost: number;
  bonus: number;
}

export interface SkillDefinition {
  key: SkillType;
  name: string;
  description: string;
  level: SkillLevel;
  prerequisites: SkillType[];
}

export interface SkillDefinitionExtended extends SkillDefinition {
  unlocks: SkillType[];
}

export type ArmorType =
  | "standardCrewAttire"
  | "advancedBattleDress"
  | "standardBattleDress"
  | "hazardSuit"
  | "vaccsuit"
  | "fatigues";

export type ArmorSpeedType = "normal" | "disadvantage";

export type WeaponRangeType = "adjacent" | "close" | "long";

export type CriticalType =
  | "Gunshot"
  | "Gunshot[+]"
  | "Bleeding [+]"
  | "Blunt Force"
  | "Blunt Force [+]"
  | "Fire/Explosives"
  | "Fire/Explosives [-]"
  | "Fire/Explosives [+]"
  | "Bleeding"
  | "Bleeding [+] or Gore [+]"
  | "Gore [+]"
  | "Bleeding + Gore";

export type WeaponType = string;

export type DamageType =
  | "fixedDamage"
  | "fixedWounds"
  | "xd5"
  | "xd10"
  | "d5MinusOneWounds"
  | "d10x10"
  | "d100";

export type RollMode = "advantage" | null;

export type ConditionType =
  | "phobia"
  | "haunted"
  | "adrenalineRush"
  | "overwhelmed"
  | "coward"
  | "nightmares"
  | "lossOfConfidence"
  | "deflated"
  | "doomed"
  | "paranoid"
  | "deathWish"
  | "catatonic"
  | "spiraling"
  | "heartAttack";

export type WoundType = "bleeding";

export type ContractorType =
  | "archaeologist"
  | "asteroidMiner"
  | "android"
  | "bodyguard"
  | "captain"
  | "chaplain"
  | "corporateFixer"
  | "doctor"
  | "engineer"
  | "gunner"
  | "marineGrunt"
  | "marineOfficer"
  | "pilot"
  | "pioneer"
  | "scientist"
  | "survivalGuide"
  | "surgeon"
  | "teamster"
  | "therapist"
  | "voidUrchin";

export interface Probability {
  min: number;
  max: number;
}

export interface Motivation {
  motivation: string;
  probability: Probability;
}

export interface Condition {
  conditionType: ConditionType;
}

export interface ConditionDefinition extends Condition {
  name: string;
  description: string;
}

export interface WithId {
  id: string;
}

export interface Damage {
  damageType: DamageType;
  amount: number;
  rollMode: RollMode;
}

export interface Wound {
  description: string;
  woundType: WoundType;
  bleed: number;
  label: string | null;
}

export interface Armor extends WithId {
  armorType: ArmorType;
  name: string;
  equipped: boolean;
  armorPoints: number;
  cost: number;
  oxygenSupply: number;
  notes: string;
  armorSpeed: ArmorSpeedType;
}

export interface Weapon extends WithId {
  name: string;
  equipped: boolean;
  cost: number;
  weaponRange: WeaponRangeType;
  damageString: string;
  shots: number | null;
  magazineSize: number | null;
  magazines: number | null;
  critical: CriticalType;
  special: string;
  weaponType: WeaponType;
  damage: Damage[];
  baseType: string;
}

export type WeaponCategory = "Firearm" | "Industrial" | "Melee";

export interface WeaponExt extends Weapon {
  type: WeaponCategory;
}

export interface Equipment extends WithId {
  name: string;
  description: string;
  equipped: boolean;
  quantity: number;
  cost: number;
  baseType: string;
}

export interface Item extends WithId {
  title: string;
  subtitle: string | null;
  description: string | null;
  cost: number;
  quantity: number;
}

export interface BaseCharacter extends WithId {
  name: string;
  pronouns: string;
  thumbnailPath?: string;
  wounds: number;
  maxWounds: number;
  equipment: Equipment[];
  armor: Armor[];
  weapons: Weapon[];
  items: Item[];
}

export interface Contractor extends BaseCharacter {
  type: ContractorType;
  occupation: string;
  salary: number;
  combat: number;
  instinct: number;
  loyalty: number;
  motivation: string;
  probability: Probability;
}

export interface Character extends BaseCharacter {
  personalNotes: string;
  characterClass: CharacterClass;
  strength: number;
  speed: number;
  intellect: number;
  combat: number;
  sanity: number;
  fear: number;
  body: number;
  maxHealth: number;
  health: number;
  stress: number;
  minStress: number;
  credits: number;
  trinket: string;
  patch: string;
  traumaResponse: string;
  highScore: number;
  bonusStat: StatType;
  skillInProgress: null | SkillType;
  skillTrainingYearsRemaining: number;
  skillTrainingMonthsRemaining: number;
  skills: SkillType[];
  conditions: Condition[];
  creationComplete: boolean;
  woundEffects: Wound[];
  contractors: Contractor[];
}

export type Updater = (update: (c: Character) => Character) => void;

export interface ClassDefinition {
  name: CharacterClass;
  traumaResponse: string;
  initialSkills: string[];
}

export interface Loadout {
  armors: Armor[];
  weapons: Weapon[];
  equipments: Equipment[];
}