import { GameMessage, StampedMessage } from "Messages/types";

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

export interface CharacterSkill {
  type: SkillType;
  lossOfConfidence: boolean;
}

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

export type ArmorSpeedType = RollMode;

export type WeaponRangeType = "adjacent" | "close" | "long";

export type WoundType = "blunt" | "bleeding" | "gunshot" | "fire" | "gore";

export type CriticalType =
  | "Gunshot"
  | "Gunshot [-]"
  | "Gunshot [+]"
  | "Bleeding"
  | "Bleeding [-]"
  | "Bleeding [+]"
  | "Blunt Force"
  | "Blunt Force [-]"
  | "Blunt Force [+]"
  | "Fire/Explosives"
  | "Fire/Explosives [-]"
  | "Fire/Explosives [+]"
  | "Gore"
  | "Gore [-]"
  | "Gore [+]"
  | "Bleeding [+] or Gore [+]"
  | "Bleeding + Gore";

export interface NormalizedCriticalType {
  woundType: WoundType;
  rollMode: RollMode;
}

export type WeaponType = string;

export type DamageType =
  | "fixedDamage"
  | "fixedWounds"
  | "xd5"
  | "xd10"
  | "xd20"
  | "d5MinusOneWounds"
  | "d10x10"
  | "d100";

export type RollMode = "advantage" | "normal" | "disadvantage";

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
  | "suspicious"
  | "deathWish"
  | "catatonic"
  | "spiraling"
  | "heartAttack";

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

export interface StressEffect {
  name: string;
  description: string;
  effect(c: Character, log: (m: GameMessage) => void): Character;
}

export interface WoundTable {
  woundType: WoundType;
  name: string;
  effects: WoundEffect[];
}

export interface WoundEffect {
  description: string;
  effect(c: Character, log: (m: GameMessage) => void): Character;
}

export interface WithId {
  id: string;
}

export interface WithWound {
  wounds: number;
  maxWounds: number;
}

export interface WithHealth {
  maxHealth: number;
  health: number;
}

export interface Damage {
  damageType: DamageType;
  amount: number;
  rollMode: RollMode;
}

export type InflictedDamageType = "health" | "wounds";

export interface InflictedDamage {
  name?: string;
  amount: RollWithMode;
  criticalType: CriticalType;
  inflicted: InflictedDamageType;
}

export interface Wound {
  description: string;
  woundType: WoundType;
}

export interface Armor extends WithId {
  armorType: ArmorType;
  name: string;
  equipped: boolean;
  armorPoints: number;
  damageReduction: number;
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

export interface BaseCharacter extends WithId, WithWound {
  name: string;
  pronouns: string;
  thumbnailPath?: string;
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

export interface Character extends BaseCharacter, WithHealth {
  personalNotes: string;
  characterClass: CharacterClass;
  strength: number;
  speed: number;
  intellect: number;
  combat: number;
  sanity: number;
  fear: number;
  body: number;
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
  skills: CharacterSkill[];
  conditions: Condition[];
  creationComplete: boolean;
  woundEffects: Wound[];
  bleeding: number;
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

export interface GenericRollResult {
  diceType: number;
  diceNbr: number;
  rollMode: RollMode;
  result: RollWithMode;
}

export interface StatRoll {
  stat: { name: string; value: number };
  skill: CharacterSkill | null;
  rollMode: RollMode;
}

export interface StatRollResult extends StatRoll {
  result: number[];
}

export interface StatRollAnalysis extends StatRollResult {
  skillDefinition: SkillDefinition | null;
  skillLevel: SkillLevelDefinition | null;
  target: number;
  rollValue: number;
  isSuccess: boolean;
  isCritical: boolean;
  rollDescritpion: string;
}

export interface AttackRollResult {
  roll: StatRollResult;
  weaponId: string;
}

export interface RollWithMode {
  rolls: number[];
  result: number;
}

export interface SaveRoll {
  save: { name: SaveType; value: number };
  skill: CharacterSkill | null;
  rollMode: RollMode;
}

export interface SaveRollResult extends SaveRoll {
  result: number[];
}

export interface SaveRollAnalysis extends SaveRollResult {
  skillDefinition: SkillDefinition | null;
  skillLevel: SkillLevelDefinition | null;
  target: number;
  rollValue: number;
  isSuccess: boolean;
  isCritical: boolean;
  rollDescritpion: string;
}

export interface PanicRoll {
  stress: number;
  rollMode: RollMode;
}

export interface PanicRollResult extends PanicRoll {
  result: number[];
}

export interface DeathCheckResult {
  rollValue: number;
}

export interface PanicRollAnalysis extends PanicRollResult {
  target: number;
  rollValue: number;
  isSuccess: boolean;
  rollDescritpion: string;
}

export interface PanicEffect {
  result: number;
}

export interface WoundEffectEntry {
  woundRoll: RollWithMode;
  type: WoundType;
}

export interface CustomEntry extends WithId {
  name: string;
  category?: string;
  description: string;
  visibleToAll: boolean;
  excluded: boolean;
}

export interface Npc extends CustomEntry, WithWound {
  name: string;
  combat: number;
  instinct: number;
}

export interface MonsterAttack extends WithId {
  name: string;
  description: string;
  critical: NormalizedCriticalType;
  damage: Damage;
}

export interface Monster extends Npc, WithHealth {
  attacks: MonsterAttack[];
}

export interface Game {
  title: string;
  npcs: Npc[];
  customEntries: CustomEntry[];
  monsters: Monster[];
  messages: StampedMessage[];
  timers: Timer[];
}

export interface RevealedElement {
  name: string;
  description: string;
}

export interface Timer extends WithId {
  title: string;
  intervalInSec: number;
  currentTimeInMSec: number;
  isRecurring: boolean;
  isPublic: boolean;
  isPaused: boolean;
}
