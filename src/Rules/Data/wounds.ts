import { Character, WoundTable, WoundType } from "Rules/types";
import { roll } from "Services/diceServices";
import { toDict } from "Services/storageServices";

function addBleeding(value: number): (c: Character) => Character {
    return c => ({...c, bleeding: c.bleeding + value})
}

export const allWoundTables: WoundTable[] = [
  {
    name: "bleeding",
    woundType: "bleeding",
    effects: [
        {
            description: "Drop held item.",
            effect(c) {
                return c
            },
        },
        {
            description: "Lots of blood. Those Close gain 1 Stress.",
            effect(c) {
                return c
            },
        },
        {
            description: "Blood in eyes. [-] until wiped clean.",
            effect(c) {
                return c
            },
        },
        {
            description: "Laceration. Bleeding +1.",
            effect: addBleeding(1),
        },
        {
            description: "Major cut. Bleeding +2.",
            effect: addBleeding(2),
        },
        {
            description: "Finger/toes severed. Bleeding +3.",
            effect: addBleeding(3),
        },
        {
            description: "Hand/foot severed. Bleeding +4",
            effect: addBleeding(4),
        },
        {
            description: "Limb severed. Bleeding +5.",
            effect: addBleeding(5),
        },
        {
            description: "Major artery cut. Bleeding +6.",
            effect: addBleeding(6),
        },
        {
            description: "Throat slit or heart pierced. Death Check.",
            effect(c) {
                return c
            },
        },
    ],
  },
  {
    name: "blunt force",
    woundType: "blunt",
    effects: [
        {
            description: "Knocked down.",
            effect(c) {
                return c
            },
        },
        {
            description: "Winded. [-] until you catch your breath.",
            effect(c) {
                return c
            },
        },
        {
            description: "Sprained Ankle. [-] on Speed Checks.",
            effect(c) {
                return c
            },
        },
        {
            description: "Concussion. [-] on mental tasks.",
            effect(c) {
                return c
            },
        },
        {
            description: "Leg or foot broken. [-] on Speed Checks.",
            effect(c) {
                return c
            },
        },
        {
            description: "Arm or hand broken. [-] manual tasks.",
            effect(c) {
                return c
            },
        },
        {
            description: "Snapped collarbone. [-] on Strength Checks.",
            effect(c) {
                return c
            },
        },
        {
            description: "Back broken. [-] on all rolls.",
            effect(c) {
                return c
            },
        },
        {
            description: "Skull cracked. [-] on all rolls.",
            effect(c) {
                return c
            },
        },
        {
            description: "Spine or neck broken. Death Check.",
            effect(c) {
                return c
            },
        },
    ],
  },
  {
    name: "fire & explosives",
    woundType: "fire",
    effects: [
        {
            description: "Hair burnt. Gain 1d5 Stress.",
            effect(c) {
                return c
            },
        },
        {
            description: "Awesome scar. +1 Minimum Stress.",
            effect(c) {
                return {...c, minStress: c.minStress + 1}
            },
        },
        {
            description: "Singed. [-] on next action.",
            effect(c) {
                return c
            },
        },
        {
            description: "Shrapnel/large burn.",
            effect(c) {
                return c
            },
        },
        {
            description: "3rd degree burns.",
            effect(c) {
                return c
            },
        },
        {
            description: "Major Burn. Body Save -2d10.",
            effect(c) {
                return {...c, body: c.body - roll(2, 10)}
            },
        },
        {
            description: "Skin grafts reauired. Body Save -2d10.",
            effect(c) {
                return {...c, body: c.body - roll(2, 10)}
            },
        },
        {
            description: "Limb on fire. 2d10 Damage per round.",
            effect(c) {
                return c
            },
        },
        {
            description: "Body on fire. 3d10 Damage per round.",
            effect(c) {
                return c
            },
        },
        {
            description: "Engulfed in fiery explosion. Death Check.",
            effect(c) {
                return c
            },
        },
    ],
  },
  {
    name: "gore & massive",
    woundType: "gore",
    effects: [
        {
            description: "Vomit. [-] on next action.",
            effect(c) {
                return c
            },
        },
        {
            description: "Awesome scar. +1 Minimum Stress.",
            effect(c) {
                return {...c, minStress: c.minStress + 1}
            },
        },
        {
            description: "Digit mangled.",
            effect(c) {
                return c
            },
        },
        {
            description: "Eyes gouged out.",
            effect(c) {
                return c
            },
        },
        {
            description: "Ripped off flesh. -1d10 Strength.",
            effect(c) {
                return {...c, strength: c.strength - roll(1, 10)}
            },
        },
        {
            description: "Paralysed waist down.",
            effect(c) {
                return c
            },
        },
        {
            description: "Limb severed. Bleeding +5.",
            effect: addBleeding(5),
        },
        {
            description: "Impaled. Bleeding +6.",
            effect: addBleeding(6),
        },
        {
            description: "Guts spooled on floor. Bleeding +7.",
            effect: addBleeding(7),
        },
        {
            description: "Head explodes. No Death Check. You have died.",
            effect(c) {
                return c
            },
        },
    ],
  },
  {
    name: "gunshot",
    woundType: "gunshot",
    effects: [
        {
            description: "Grazed. Knocked down.",
            effect(c) {
                return c
            },
        },
        {
            description: "Bleeding +1.",
            effect: addBleeding(1),
        },
        {
            description: "Broken rib.",
            effect(c) {
                return c
            },
        },
        {
            description: "Fractured extremity.",
            effect(c) {
                return c
            },
        },
        {
            description: "Internal bleeding. Bleeding +2.",
            effect: addBleeding(2),
        },
        {
            description: "Lodged bullet. Surgery required.",
            effect(c) {
                return c
            },
        },
        {
            description: "Gunshot wound to the neck.",
            effect(c) {
                return c
            },
        },
        {
            description: "Major blood loss. Bleeding +4.",
            effect: addBleeding(4),
        },
        {
            description: "Sucking chest wound. Bleeding +5.",
            effect: addBleeding(5),
        },
        {
            description: "Headshot. Death Check.",
            effect(c) {
                return c
            },
        },
    ],
  },
];

export const allWoundTablesDict: Record<WoundType, WoundTable> = toDict(allWoundTables, wt => wt.woundType);