import { GameMessage } from "Messages/types";
import { allWoundTablesDict } from "Rules/Data/wounds";
import {
  CriticalType,
  NormalizedCriticalType,
  Character,
  InflictedDamage,
  Damage,
  WoundType,
  WithHealth,
  WithWound,
  RollMode,
} from "Rules/types";
import { applyRollMode, roll } from "./diceServices";

export function woundTypeToCriticalType(wt: WoundType): CriticalType {
  if (wt === "bleeding") {
    return "Bleeding";
  }
  if (wt === "blunt") {
    return "Blunt Force";
  }
  if (wt === "fire") {
    return "Fire/Explosives";
  }
  if (wt === "gore") {
    return "Gore";
  }
  if (wt === "gunshot") {
    return "Gunshot";
  }
  throw new Error("Unknown wound type");
}

export function normalizeCriticalType(
  criticalType: CriticalType
): NormalizedCriticalType[] {
  if (criticalType === "Bleeding") {
    return [{ woundType: "bleeding", rollMode: "normal" }];
  }
  if (criticalType === "Bleeding [+]") {
    return [{ woundType: "bleeding", rollMode: "advantage" }];
  }
  if (criticalType === "Blunt Force") {
    return [{ woundType: "blunt", rollMode: "normal" }];
  }
  if (criticalType === "Blunt Force [+]") {
    return [{ woundType: "blunt", rollMode: "advantage" }];
  }
  if (criticalType === "Fire/Explosives") {
    return [{ woundType: "fire", rollMode: "normal" }];
  }
  if (criticalType === "Fire/Explosives [+]") {
    return [{ woundType: "fire", rollMode: "advantage" }];
  }
  if (criticalType === "Fire/Explosives [-]") {
    return [{ woundType: "fire", rollMode: "disadvantage" }];
  }
  if (criticalType === "Gore") {
    return [{ woundType: "gore", rollMode: "advantage" }];
  }
  if (criticalType === "Gore [+]") {
    return [{ woundType: "gore", rollMode: "advantage" }];
  }
  if (criticalType === "Gunshot") {
    return [{ woundType: "gunshot", rollMode: "normal" }];
  }
  if (criticalType === "Gunshot [+]") {
    return [{ woundType: "gunshot", rollMode: "advantage" }];
  }
  if (criticalType === "Bleeding + Gore") {
    return [
      { woundType: "bleeding", rollMode: "normal" },
      { woundType: "gore", rollMode: "normal" },
    ];
  }
  if (criticalType === "Bleeding [+] or Gore [+]") {
    return [{ woundType: "gore", rollMode: "advantage" }];
  }

  throw new Error("unknown critical type");
}

export function rollWound(
  character: Character,
  log: (m: GameMessage) => void,
  woundRolls: NormalizedCriticalType[]
): Character {
  let newChar = { ...character };
  woundRolls.forEach((wr) => {
    const woundTable = allWoundTablesDict[wr.woundType];
    const woundRoll = applyRollMode(wr.rollMode, () => roll(1, 10));
    const woundEffect = woundTable.effects[woundRoll.result - 1];
    log({
      type: "WoundEffectMessage",
      props: { type: wr.woundType, woundRoll },
    });
    newChar = woundEffect.effect(newChar, log);
  });
  return newChar;
}

export function applyWoundDamage<T extends WithWound>(
  character: T,
  damage: InflictedDamage
): T {
  let newChar = { ...character };

  if (damage.inflicted === "health") {
    newChar.wounds += Math.floor(damage.amount.result / 10) + 1;
  }

  if (damage.inflicted === "wounds") {
    newChar.wounds += damage.amount.result;
  }

  return newChar;
}

export function applyHealthDamage<T extends WithWound & WithHealth>(
  character: T,
  damage: InflictedDamage
): { newChar: T; woundsNbr: number } {
  let newChar = { ...character };
  let woundsNbr = 0;
  if (damage.inflicted === "health") {
    let damageLeft = damage.amount.result;
    while (damageLeft >= newChar.health) {
      damageLeft -= newChar.health;
      newChar.health = newChar.maxHealth;
      newChar.wounds += 1;
      woundsNbr += 1;
    }
    newChar.health -= damageLeft;
  }

  if (damage.inflicted === "wounds") {
    woundsNbr = damage.amount.result;
    newChar.wounds += damage.amount.result;
  }

  return { newChar, woundsNbr };
}

export function applyDamage(
  character: Character,
  log: (m: GameMessage) => void,
  damage: InflictedDamage
): Character {
  let { newChar, woundsNbr } = applyHealthDamage(character, damage);

  for (let i = 0; i < woundsNbr; i++) {
    const woundRolls = normalizeCriticalType(damage.criticalType);
    newChar = rollWound(newChar, log, woundRolls);
  }

  return newChar;
}

export function getRollModeSuffix(rollMode: RollMode): string {
  if (rollMode === "normal") { return ""; }
  if (rollMode === "advantage") { return " [+]"; }
  if (rollMode === "disadvantage") { return " [-]"; }
  throw new Error("unknown roll mode");
}

export function getDamageDescription(damages: Damage): string {
  if (damages.damageType === "d100") {
    return "d100";
  }
  if (damages.damageType === "d10x10") {
    return "d10x10";
  }
  if (damages.damageType === "d5MinusOneWounds") {
    return "d5 - 1 wounds";
  }
  if (damages.damageType === "fixedDamage") {
    return `fixed ${damages.amount}`;
  }
  if (damages.damageType === "fixedWounds") {
    return `fixed ${damages.amount} wounds`;
  }
  if (damages.damageType === "xd10") {
    return `${damages.amount}d10`;
  }
  if (damages.damageType === "xd20") {
    return `${damages.amount}d20`;
  }
  if (damages.damageType === "xd5") {
    return `${damages.amount}d5`;
  }

  throw new Error("unknown damage type");
}

export function innerRollDamages(
  damages: Damage,
  criticalType: CriticalType
): InflictedDamage {
  if (damages.damageType === "d100") {
    return {
      amount: applyRollMode(damages.rollMode, () => roll(1, 100)),
      inflicted: "health",
      criticalType,
    };
  }
  if (damages.damageType === "d10x10") {
    return {
      amount: applyRollMode(damages.rollMode, () => roll(1, 10) * 10),
      inflicted: "health",
      criticalType,
    };
  }
  if (damages.damageType === "d5MinusOneWounds") {
    return {
      amount: applyRollMode(damages.rollMode, () => roll(1, 5) - 1),
      inflicted: "wounds",
      criticalType,
    };
  }
  if (damages.damageType === "fixedDamage") {
    return {
      amount: { result: damages.amount, rolls: [damages.amount] },
      inflicted: "health",
      criticalType,
    };
  }
  if (damages.damageType === "fixedWounds") {
    return {
      amount: { result: damages.amount, rolls: [damages.amount] },
      inflicted: "wounds",
      criticalType,
    };
  }
  if (damages.damageType === "xd10") {
    return {
      amount: applyRollMode(damages.rollMode, () => roll(damages.amount, 10)),
      inflicted: "health",
      criticalType,
    };
  }
  if (damages.damageType === "xd5") {
    return {
      amount: applyRollMode(damages.rollMode, () => roll(damages.amount, 5)),
      inflicted: "health",
      criticalType,
    };
  }

  throw new Error("unknown damage type");
}

export function rollDamages(
  damages: Damage,
  criticalType: CriticalType,
  isCritical: boolean
): InflictedDamage {
  const damage = innerRollDamages(damages, criticalType);
  if (isCritical) {
    damage.amount.result *= 2;
    damage.amount.rolls = damage.amount.rolls.map((v) => v * 2);
  }
  return damage;
}
