import { analyseRoll } from "helpers";
import { RollAnalysis, RollResult } from "./Rules/types";
import { expect, test } from "vitest";

test('analyseRoll p. 19 (non-critical advantage success)', () => {
    const result : RollAnalysis =  analyseRoll({
	stat: { name: "Strength", value: 35 },
	skill: { type: "industrialEquipment", lossOfConfidence: false},
	rollMode: "advantage",
	result: [66, 43]
    });
    expect(result.isSuccess).toBeTruthy();
    expect(result.isCritical).toBeFalsy();
})

test('analyseRoll p. 20 (non-critical advantage fail)', () => {
    const result : RollAnalysis = analyseRoll({
	stat: { name: "sanity", value: 14 },
	skill: null,
	rollMode: "advantage",
	result: [22, 56]
    });
    expect(result.isSuccess).toBeFalsy();
    expect(result.isCritical).toBeFalsy();
})

test('analyseRoll p. 22 (critical disadvantage fail)', () => {
    const result : RollAnalysis =  analyseRoll({
	stat: { name: "Speed", value: 36 },
	skill: { type: "zeroG", lossOfConfidence: false},
	rollMode: "disadvantage",
	result: [54, 77]
    });
    expect(result.isSuccess).toBeFalsy();
    expect(result.isCritical).toBeTruthy();
})

test('analyseRoll p. 37 (non-critical normal success)', () => {
    const result : RollAnalysis =  analyseRoll({
	stat: { name: "Fear", value: 28 },
	skill: null,
	rollMode: "normal",
	result: [23]
    });
    expect(result.isSuccess).toBeTruthy();
    expect(result.isCritical).toBeFalsy();
})
