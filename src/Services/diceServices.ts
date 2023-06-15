import { RollMode, RollWithMode, SaveRoll, SaveRollResult, StatRoll, StatRollResult } from "Rules/types";

export function simpleRoll(sides: number): number {
    return Math.floor(Math.random() * sides);
}

export function roll(number: number, sides: number): number {
    let result = 0;
    for (let i = 0; i < number; i++) {
        result += simpleRoll(sides) + 1;
    }
    return result;
}

export function pickRandom<T>(source: T[]): T {
    return source[simpleRoll(source.length)];
}

export function applyRollMode(rollMode: RollMode, roll: () => number): RollWithMode {
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

export function rollStat(roll: StatRoll): StatRollResult {
  const result =
    roll.rollMode === "normal"
      ? [simpleRoll(100)]
      : [simpleRoll(100), simpleRoll(100)];
  return { ...roll, result };
}

export function rollSave(roll: SaveRoll): SaveRollResult {
  const result =
    roll.rollMode === "normal"
      ? [simpleRoll(100)]
      : [simpleRoll(100), simpleRoll(100)];
  return { ...roll, result };
}
