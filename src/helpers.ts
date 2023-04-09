import { GameMessage } from "Messages/types";
import { useMemo } from "react";
import {
  allSkillsDict,
  allSkillLevelDefinitionDict,
  stressTable,
} from "Rules/data";
import { allWoundTablesDict } from "Rules/Data/wounds";
import {
  Character,
  CriticalType,
  Damage,
  InflictedDamage,
  NormalizedCriticalType,
  PanicRollAnalysis,
  PanicRollResult,
  RollMode,
  RollWithMode,
  SaveRollAnalysis,
  SaveRollResult,
  StatRollAnalysis,
  StatRollResult,
  WithId,
} from "Rules/types";
import { roll } from "Services/diceServices";
import { uuidv4 } from "Services/services";

export function formatCredits(c: number): string {
  if (Math.abs(c) >= 1000) {
    return `${c / 1000}kcr`;
  }
  return `${c}cr`;
}

export function clone<T extends WithId>(e: T): T {
  return { ...e, id: uuidv4() };
}

const rollModeDescr: Record<RollMode, string> = {
  advantage: " [+]",
  disadvantage: " [-]",
  normal: "",
};

export function analyseStatRoll(rollResult: StatRollResult): StatRollAnalysis {
  const { stat, skill, rollMode, result } = rollResult;
  let rollValue = result[0];
  if (rollMode === "advantage") {
    rollValue = Math.min(...result);
  }
  if (rollMode === "disadvantage") {
    rollValue = Math.max(...result);
  }
  const skillDefinition = skill !== null ? allSkillsDict[skill] : null;
  const skillLevel =
    skillDefinition !== null
      ? allSkillLevelDefinitionDict[skillDefinition.level]
      : null;
  const skillBonus = skillLevel?.bonus ?? 0;
  const target = stat.value + skillBonus;
  const isSuccess = rollValue < target;
  const isCritical = rollValue % 11 === 0;
  const skillDescription =
    skillDefinition !== null ? ` + ${skillDefinition?.name}` : "";
  const rollDescritpion = `${stat.name}${skillDescription}${rollModeDescr[rollMode]}`;
  return {
    ...rollResult,
    skillDefinition,
    skillLevel,
    target,
    rollValue,
    isSuccess,
    isCritical,
    rollDescritpion,
  };
}

export function analyseSaveRoll(rollResult: SaveRollResult): SaveRollAnalysis {
  const { save, rollMode, result } = rollResult;
  let rollValue = result[0];
  if (rollMode === "advantage") {
    rollValue = Math.min(...result);
  }
  if (rollMode === "disadvantage") {
    rollValue = Math.max(...result);
  }
  const target = save.value;
  const isSuccess = rollValue < target;
  const isCritical = rollValue % 11 === 0;
  const rollDescritpion = `${save.name}${rollModeDescr[rollMode]}`;
  return {
    ...rollResult,
    target,
    rollValue,
    isSuccess,
    isCritical,
    rollDescritpion,
  };
}

export function analysePanicRoll(
  rollResult: PanicRollResult
): PanicRollAnalysis {
  const { stress, rollMode, result } = rollResult;
  let rollValue = result[0];
  const maxVal = Math.max(...result);
  const minVal = Math.min(...result);
  if (rollMode === "advantage") {
    rollValue = maxVal > stress ? maxVal : minVal;
  }
  if (rollMode === "disadvantage") {
    rollValue = maxVal <= stress ? maxVal : minVal;
  }
  const target = stress;
  const isSuccess = rollValue > target;
  const rollDescritpion = `panic${rollModeDescr[rollMode]}`;
  return {
    ...rollResult,
    target,
    rollValue,
    isSuccess,
    rollDescritpion,
  };
}

export function updateInList<T extends WithId>(
  list: T[],
  id: string,
  setter: (e: T) => T
): T[] {
  return list.map((e) => {
    if (e.id !== id) {
      return e;
    } else {
      return setter(e);
    }
  });
}

export function deleteInList<T extends WithId>(list: T[], id: string): T[] {
  return list.filter((e) => {
    return e.id !== id;
  });
}

export function useBrowserId(): string {
  return useMemo(() => {
    const key = "browser_id";
    const cached = localStorage.getItem(key);
    if (cached) {
      return cached;
    }
    const newId = uuidv4();
    localStorage.setItem(key, newId);
    return newId;
  }, []);
}

export function applyPanic(
  character: Character,
  log: (m: GameMessage) => void,
  result: number
): Character {
  log({ type: "PanicEffectMessage", props: { result } });
  const entry = stressTable[result];
  return entry.effect(character, log);
}

function normalizeCriticalType(criticalType: CriticalType): NormalizedCriticalType[] {
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
    return [{ woundType: "bleeding", rollMode: "normal" }, { woundType: "gore", rollMode: "normal" }];
  }
  if (criticalType === "Bleeding [+] or Gore [+]") {
    return [{ woundType: "gore", rollMode: "advantage" }];
  }

  throw new Error("unknown critical type");
}

function rollWound(  character: Character,
  log: (m: GameMessage) => void,
  criticalType: CriticalType
): Character {
  const woundRolls = normalizeCriticalType(criticalType);
  let newChar = {...character};
  woundRolls.forEach(wr => {
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

export function rollDamages(damages: Damage, criticalType: CriticalType): InflictedDamage {
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
