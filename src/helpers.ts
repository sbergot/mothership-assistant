import { allSkillsDict, allSkillLevelDefinitionDict } from "Rules/data";
import { RollMode, StatRollAnalysis, StatRollResult, WithId } from "Rules/types";
import { uuidv4 } from "Services/services";

export function formatCredits(c: number): string {
  if (Math.abs(c) >= 1000) {
    return `${c/1000}kcr`
  }
  return `${c}cr`
}

export function clone<T extends WithId>(e: T): T {
  return {...e, id: uuidv4()};
}

const rollModeDescr: Record<RollMode, string> = {
  advantage: " [+]",
  disadvantage: " [-]",
  normal: "",
}

export function analyseStatRoll(rollResult : StatRollResult): StatRollAnalysis {
  const { stat, skill, rollMode, result } = rollResult;
  let rollValue = result[0];
  if (rollMode === "advantage") {
    rollValue = Math.min(...result);
  }
  if (rollMode === "disadvantage") {
    rollValue = Math.max(...result);
  }
  const skillDefinition = skill !== null ? allSkillsDict[skill] : null;
  const skillLevel = skillDefinition !== null ? allSkillLevelDefinitionDict[skillDefinition.level] : null;
  const skillBonus = skillLevel?.bonus ?? 0;
  const target = stat.value + skillBonus;
  const isSuccess = rollValue < target;
  const isCritical = rollValue % 11 === 0;
  const skillDescription = skillDefinition !== null ? ` + ${skillDefinition?.name}` : "";
  const rollDescritpion = `${stat.name}${skillDescription}${rollModeDescr[rollMode]}`
  return {
    ...rollResult,
    skillDefinition,
    skillLevel,
    target,
    rollValue,
    isSuccess,
    isCritical,
    rollDescritpion
  }
}