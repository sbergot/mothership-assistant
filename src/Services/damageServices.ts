import { GameMessage } from "Messages/types";
import { allWoundTablesDict } from "Rules/Data/wounds";
import {
  CriticalType,
  NormalizedCriticalType,
  Character,
  InflictedDamage,
  RollMode,
  RollWithMode,
  Damage,
  WoundType,
} from "Rules/types";
import { roll } from "./diceServices";

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

function rollWound(
  character: Character,
  log: (m: GameMessage) => void,
  criticalType: CriticalType
): Character {
  const woundRolls = normalizeCriticalType(criticalType);
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

export function applyDamage(
  character: Character,
  log: (m: GameMessage) => void,
  damage: InflictedDamage
): Character {
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

  for (let i = 0; i < woundsNbr; i++) {
    newChar = rollWound(newChar, log, damage.criticalType);
  }

  return newChar;
}

function applyRollMode(rollMode: RollMode, roll: () => number): RollWithMode {
  if (rollMode === "normal") {
    const result = roll();
    return { result, rolls: [result] };
  }
  if (rollMode === "advantage") {
    const rolls = [roll(), roll()];
    return { rolls, result: Math.max(...rolls) };
  }
  if (rollMode === "disadvantage") {
    const rolls = [roll(), roll()];
    return { rolls, result: Math.min(...rolls) };
  }

  throw new Error("unknwon roll mode");
}

export function rollDamages(
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
