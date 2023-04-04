import { WoundTable, WoundType } from "Rules/types";

export const allWoundTablesDict: Record<WoundType, WoundTable> = {
  bleeding: {
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
            effect(c) {
                return c
            },
        },
        {
            description: "Major cut. Bleeding +2.",
            effect(c) {
                return c
            },
        },
        {
            description: "Finger/toes severed. Bleeding +3.",
            effect(c) {
                return c
            },
        },
        {
            description: "Hand/foot severed. Bleeding +4",
            effect(c) {
                return c
            },
        },
        {
            description: "Limb severed. Bleeding +5.",
            effect(c) {
                return c
            },
        },
        {
            description: "Major artery cut.",
            effect(c) {
                return c
            },
        },
        {
            description: "Throat slit or heart pierced. Death Check.",
            effect(c) {
                return c
            },
        },
    ],
  },
  blunt: {
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
            description: "Concussion. [-] on Intellect Checks.",
            effect(c) {
                return c
            },
        },
        {
            description: "Leg or foot broken.",
            effect(c) {
                return c
            },
        },
        {
            description: "Arm or hand broken.",
            effect(c) {
                return c
            },
        },
        {
            description: "Snapped collarbone.",
            effect(c) {
                return c
            },
        },
        {
            description: "Back broken.",
            effect(c) {
                return c
            },
        },
        {
            description: "Skull cracked.",
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
  fire: {
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
                return c
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
                return c
            },
        },
        {
            description: "Skin grafts reauired. Body Save -2d10.",
            effect(c) {
                return c
            },
        },
        {
            description: "Limb on fire. 2d10 Damage per round.",
            effect(c) {
                return c
            },
        },
        {
            description: "Body on fire.",
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
  gore: {
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
                return c
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
                return c
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
            effect(c) {
                return c
            },
        },
        {
            description: "Impaled. Bleeding +6.",
            effect(c) {
                return c
            },
        },
        {
            description: "Guts spooled on floor.",
            effect(c) {
                return c
            },
        },
        {
            description: "Head explodes. No Death Check. You have died.",
            effect(c) {
                return c
            },
        },
    ],
  },
  gunshot: {
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
            effect(c) {
                return c
            },
        },
        {
            description: "Broken rib.",
            effect(c) {
                return c
            },
        },
        {
            description: "FRactured extremity.",
            effect(c) {
                return c
            },
        },
        {
            description: "Internal bleeding. Bleeding +2.",
            effect(c) {
                return c
            },
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
            effect(c) {
                return c
            },
        },
        {
            description: "Sucking chest wound.",
            effect(c) {
                return c
            },
        },
        {
            description: "Headshot. Death Check.",
            effect(c) {
                return c
            },
        },
    ],
  },
};
