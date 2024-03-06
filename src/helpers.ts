import { GameMessage } from "Messages/types";
import { useMemo } from "react";
import { stressTable } from "Rules/data";
import { allSkillsDict, allSkillLevelDefinitionDict } from "Rules/Data/skills";
import {
  Character,
  PanicRollAnalysis,
  PanicRollResult,
  RollMode,
  RollAnalysis,
  RollResult,
  WithId,
} from "Rules/types";
import { uuidv4 } from "Services/storageServices";

interface AnalyzedRoll {
  value: number;
  isSuccess: boolean;
  isCritical: boolean;
}

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

function analyseSingleRoll(value: number, target: number): AnalyzedRoll {
  return {
    value,
    isSuccess: value < target,
    isCritical: value % 11 === 0,
  };
}

function evaluateRoll(roll: AnalyzedRoll): number {
  const successFactor = roll.isSuccess ? 1 : -1;
  // a successful roll is always better than a failed one
  // in case of a success a critical is positive contribution,
  // but a negative contribution in case of a failure
  return successFactor * 5 + (roll.isCritical ? 1 : 0) * successFactor;
}

function sortByRollResult(rolls: AnalyzedRoll[]): AnalyzedRoll[] {
  return rolls.sort((r1, r2) => evaluateRoll(r1) - evaluateRoll(r2));
}

export function analyseRoll(rollResult: RollResult): RollAnalysis {
  const { stat, skill, rollMode, result } = rollResult;
  const skillDefinition = skill !== null ? allSkillsDict[skill.type] : null;
  const skillLevel =
    skillDefinition !== null
      ? allSkillLevelDefinitionDict[skillDefinition.level]
      : null;
  const skillBonus =
    skill?.lossOfConfidence || skillLevel == null ? 0 : skillLevel.bonus;
  const target = stat.value + skillBonus;
  const analysedRolls = result.map((r) => analyseSingleRoll(r, target));
  let bestRoll = analysedRolls[0];
  if (rollMode === "advantage") {
    const sortedRolls = sortByRollResult(analysedRolls);
    bestRoll = sortedRolls[sortedRolls.length - 1];
  }
  if (rollMode === "disadvantage") {
    const sortedRolls = sortByRollResult(analysedRolls);
    bestRoll = sortedRolls[0];
  }
  const { isSuccess, isCritical } = bestRoll;
  const rollValue = bestRoll.value;
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

export function analysePanicRoll(
  rollResult: PanicRollResult,
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
  setter: (e: T) => T,
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
  result: number,
): Character {
  log({ type: "PanicEffectMessage", props: { result } });
  const entry = stressTable[result];
  return entry.effect(character, log);
}

export function getDebouncer(delay: number): (cb: () => void) => void {
  let debounceTimer: number;
  return (callback: () => void) => {
    window.clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(callback, delay);
  };
}
