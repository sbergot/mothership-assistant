import { analyseStatRoll } from "helpers";
import { StatRollResult } from "./Rules/types";
import { expect, test } from "vitest";


test('analyseStatRoll normal success', () => {
    const result : StatRollResult =  {
	stat: { name: "intellect", value: 56 },
	skill: { type: "linguistics", lossOfConfidence: false},
	rollMode: "normal",
	result: [45]
    };
    expect(analyseStatRoll(result)).toBeTruthy();
})

test('analyseStatRoll advantage success', () => {
    const result : StatRollResult =  {
	stat: { name: "speed", value: 56 },
	skill: { type: "psychology", lossOfConfidence: false},
	rollMode: "advantage",
	result: [43, 68]
    };
    expect(analyseStatRoll(result)).toBeTruthy();
})

test('analyseStatRoll disadvantage success', () => {
    const result : StatRollResult =  {
	stat: { name: "intellect", value: 56 },
	skill: { type: "linguistics", lossOfConfidence: false},
	rollMode: "advantage",
	result: [43, 68]
    };
    expect(analyseStatRoll(result)).toBeTruthy();
})
