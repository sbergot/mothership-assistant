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
  Damage,
  InflictedDamage,
  PanicRollAnalysis,
  PanicRollResult,
  RollMode,
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

export function applyDamage(
  character: Character,
  log: (m: GameMessage) => void,
  damage: InflictedDamage
): Character {
  let newChar = { ...character };
  let woundsNbr = 0;
  if (damage.inflicted === "health") {
    let damageLeft = damage.amount;
    while (damageLeft >= newChar.health) {
      damageLeft -= newChar.health;
      newChar.health = newChar.maxHealth;
      newChar.wounds += 1;
      woundsNbr += 1;
    }
    newChar.health -= damageLeft;
  }

  if (damage.inflicted === "wounds") {
    woundsNbr = damage.amount;
    newChar.wounds += damage.amount;
  }

  const woundTable = allWoundTablesDict[damage.type];

  for (let i = 0; i < woundsNbr; i++) {
    const woundRoll = roll(1, 10);
    const woundEffect = woundTable.effects[woundRoll - 1];
    log({ type: "WoundEffectMessage", props: { type: damage.type, woundRoll } })
    newChar = woundEffect.effect(newChar, log);
  }

  return newChar;
}

export function rollDamages(damages: Damage): InflictedDamage {
  let amount = 0;
  if (damages.damageType === "d100") {
    
  }
}