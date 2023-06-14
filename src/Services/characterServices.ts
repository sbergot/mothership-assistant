import { updateInList } from "helpers";
import { uuidv4 } from "./storageServices";
import { BaseCharacter, Character } from "Rules/types";

export function initCharacter(): Character {
  return {
    id: uuidv4(),
    characterClass: "android",
    name: "",
    pronouns: "",
    personalNotes: "",
    thumbnailPath: "",
    strength: 0,
    speed: 0,
    intellect: 0,
    combat: 0,
    sanity: 0,
    fear: 0,
    body: 0,
    stress: 2,
    minStress: 2,
    maxWounds: 0,
    wounds: 0,
    maxHealth: 0,
    health: 0,
    bleeding: 0,
    credits: 0,
    trinket: "",
    patch: "",
    traumaResponse: "",
    highScore: 0,
    bonusStat: "speed",
    skillInProgress: null,
    skillTrainingYearsRemaining: 0,
    skillTrainingMonthsRemaining: 0,
    skills: [],
    equipment: [],
    armor: [],
    weapons: [],
    items: [],
    conditions: [],
    creationComplete: false,
    woundEffects: [],
    contractors: [],
  };
}

export function spendAmmoForWeapon<T extends BaseCharacter>(character: T, weaponId: string): T {
  return {
    ...character,
    weapons: updateInList(character.weapons, weaponId, (w) => {
      if (w.shots == null) {
        return w;
      }
      if (w.shots > 1) {
        return {
          ...w,
          shots: w.shots - 1,
        };
      }
      if (w.shots === 1 && w.magazines! > 0) {
        return {
          ...w,
          shots: w.magazineSize,
          magazines: w.magazines! - 1,
        };
      }
      return {
        ...w,
        shots: 0,
      };
    }),
  };
}
