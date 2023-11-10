import { toDict } from "Services/storageServices";
import {
  Armor,
  ArmorType,
  ClassDefinition,
  Condition,
  ConditionDefinition,
  ConditionType,
  Motivation,
  SaveType,
  StatType,
  StressEffect,
} from "./types";
import { roll } from "Services/diceServices";
import { applyPanic } from "helpers";

export const allStats: StatType[] = [
  "strength",
  "speed",
  "intellect",
  "combat",
];

export const allSaves: SaveType[] = ["sanity", "fear", "body"];

function addCondition(conditions: Condition[], cond: Condition): Condition[] {
  return [
    ...conditions.filter((c) => c.conditionType !== cond.conditionType),
    cond,
  ];
}

export const stressTable: StressEffect[] = [
  {
    name: "adrenaline rush",
    description:
      "[+] on all rolls for the next 2d10 minutes. Reduce your Stress by 1d5.",
    effect(c, log) {
      const stressLoss = roll(1, 5) + 1;
      log({
        type: "SimpleMessage",
        props: { content: `stress reduced by ${stressLoss}` },
      });
      return {
        ...c,
        stress: c.stress - stressLoss,
        conditions: addCondition(c.conditions, {
          conditionType: "adrenalineRush",
        }),
      };
    },
  },
  {
    name: "anxious",
    description: "gain 1 stress",
    effect(c) {
      return { ...c, stress: c.stress + 1 };
    },
  },
  {
    name: "jumpy",
    description: "Gain 1 Stress. All Close crewmembers gain 2 Stress.",
    effect(c) {
      return { ...c, stress: c.stress + 1 };
    },
  },
  {
    name: "overwhelmed",
    description:
      "All actions at [-] for 1d10 minutes. Permanently raise your Minimum Stress by 1.",
    effect(c, log) {
      log({
        type: "SimpleMessage",
        props: { content: `overwhelmed for ${roll(1, 10)} minutes` },
      });
      return {
        ...c,
        minStress: c.minStress + 1,
        conditions: addCondition(c.conditions, {
          conditionType: "overwhelmed",
        }),
      };
    },
  },
  {
    name: "coward",
    description:
      "Gain a new Condition: You must make a Fear Save to engage in violence or flee.",
    effect(c) {
      return {
        ...c,
        conditions: addCondition(c.conditions, {
          conditionType: "coward",
        }),
      };
    },
  },
  {
    name: "frightened",
    description:
      "Gain a new Condition: Phobia: When encountering your Phobia make a Fear Save [-] or gain 1d5 Stress.",
    effect(c) {
      return {
        ...c,
        conditions: addCondition(c.conditions, {
          conditionType: "phobia",
        }),
      };
    },
  },
  {
    name: "nightmares",
    description:
      "Gain a new Condition: Sleep is difficult, gain [-] on all Rest Saves.",
    effect(c) {
      return {
        ...c,
        conditions: addCondition(c.conditions, {
          conditionType: "nightmares",
        }),
      };
    },
  },
  {
    name: "loss of confidence",
    description:
      "Gain a new Condition: Choose one of your Skills and lose that Skill’s bonus.",
    effect(c) {
      return {
        ...c,
        conditions: addCondition(c.conditions, {
          conditionType: "lossOfConfidence",
        }),
      };
    },
  },
  {
    name: "deflated",
    description:
      "Gain a new Condition: Whenever a Close crewmember fails a Save, gain 1 Stress.",
    effect(c) {
      return {
        ...c,
        conditions: addCondition(c.conditions, {
          conditionType: "deflated",
        }),
      };
    },
  },
  {
    name: "doomed",
    description:
      "Gain a new Condition: You feel cursed and unlucky. All Critical Successes are instead Critical Failures.",
    effect(c) {
      return {
        ...c,
        conditions: addCondition(c.conditions, {
          conditionType: "doomed",
        }),
      };
    },
  },
  {
    name: "paranoid",
    description:
      "For the next week, whenever someone joins your group (even if they only left for a short period of time), make a Fear Save or gain 1 Stress.",
    effect(c) {
      return {
        ...c,
        conditions: addCondition(c.conditions, {
          conditionType: "paranoid",
        }),
      };
    },
  },
  {
    name: "haunted",
    description:
      "Gain a new Condition: Something starts visiting you at night. In your dreams. Out of the corner of your eye. And soon it will start making demands.",
    effect(c) {
      return {
        ...c,
        conditions: addCondition(c.conditions, {
          conditionType: "haunted",
        }),
      };
    },
  },
  {
    name: "death wish",
    description:
      "For the next 24 hours, whenever you encounter a stranger or known enemy, you must make a Sanity Save or immediately attack them.",
    effect(c) {
      return {
        ...c,
        conditions: addCondition(c.conditions, {
          conditionType: "deathWish",
        }),
      };
    },
  },
  {
    name: "prophetic vision",
    description:
      "You immediately experience an intense hallucination or vision of an impending terror or horrific event. Gain 1 Stress.",
    effect(c) {
      return { ...c, stress: c.stress + 1 };
    },
  },
  {
    name: "catatonic",
    description:
      "Become unresponsive and unmoving for 2d10 minutes. Reduce Stress by 1d10.",
    effect(c, log) {
      const stressLoss = roll(1, 10);
      log({
        type: "SimpleMessage",
        props: {
          content: `catatonic for ${roll(
            2,
            10
          )} minutes. Stress reduced by ${stressLoss}`,
        },
      });
      return {
        ...c,
        stress: c.stress - stressLoss,
        conditions: addCondition(c.conditions, { conditionType: "catatonic" }),
      };
    },
  },
  {
    name: "rage",
    description:
      "Immediately attack the closest crewmember until you inflict at least 2d10 DMG. If there is no crewmember Close, you attack your surrounding environment.",
    effect(c, log) {
      log({
        type: "SimpleMessage",
        props: { content: `minimum damage: ${roll(2, 10)}` },
      });
      return { ...c };
    },
  },
  {
    name: "spiraling",
    description:
      "Gain a new Condition: You make Panic Checks with Disadvantage.",
    effect(c) {
      return {
        ...c,
        conditions: addCondition(c.conditions, {
          conditionType: "spiraling",
        }),
      };
    },
  },
  {
    name: "compounding problems",
    description:
      "Roll twice on this table. Permanently raise your Minimum Stress by 1.",
    effect(c, log) {
      let newChar = c;
      newChar = applyPanic(newChar, log, roll(1, 20));
      newChar = applyPanic(newChar, log, roll(1, 20));
      return { ...newChar, minStress: c.minStress + 1 };
    },
  },
  {
    name: "heart attack / short circuit (androids)",
    description:
      "Permanently lose 1 Wound. Gain [-] on all rolls for 1d10 hours. Permanently raise your Minimum Stress by 1.",
    effect(c, log) {
      log({
        type: "SimpleMessage",
        props: { content: `Gain [-] for ${roll(1, 10)} hours` },
      });
      return {
        ...c,
        maxWounds: c.maxWounds - 1,
        conditions: addCondition(c.conditions, {
          conditionType: "heartAttack",
        }),
      };
    },
  },
  {
    name: "collapse",
    description:
      "You no longer control this character. Hand your sheet to the Warden and roll up a new character to play.",
    effect(c) {
      return { ...c };
    },
  },
];

export const allConditionDefinitions: ConditionDefinition[] = [
  {
    conditionType: "phobia",
    name: "Phobia",
    description:
      "When encountering your Phobia make a Fear Save [-] or gain 1d5 Stress.",
  },
  {
    conditionType: "haunted",
    name: "Haunted",
    description:
      "Something starts visiting you at night. In your dreams. Out of the corner of your eye. And soon it will start making demands.",
  },
  {
    conditionType: "adrenalineRush",
    name: "Adrenaline Rush",
    description: "[+] on all rolls for the next 2d10 minutes",
  },
  {
    conditionType: "overwhelmed",
    name: "Overwhelmed",
    description: "All actions at [-] for 1d10 minutes.",
  },
  {
    conditionType: "coward",
    name: "Coward",
    description: "You must make a Fear Save to engage in violence or flee.",
  },
  {
    conditionType: "nightmares",
    name: "Nightmares",
    description: "Sleep is difficult, gain [-] on all Rest Saves.",
  },
  {
    conditionType: "lossOfConfidence",
    name: "Loss of Confidence",
    description: "Choose one of your Skills and lose that Skill’s bonus.",
  },
  {
    conditionType: "deflated",
    name: "Deflated",
    description: "Whenever a Close crewmember fails a Save, gain 1 Stress.",
  },
  {
    conditionType: "doomed",
    name: "Doomed",
    description:
      "You feel cursed and unlucky. All Critical Successes are instead Critical Failures.",
  },
  {
    conditionType: "paranoid",
    name: "Paranoid",
    description:
      "For the next week, whenever someone joins your group (even if they only left for a short period of time), make a Fear Save or gain 1 Stress.",
  },
  {
    conditionType: "deathWish",
    name: "Death Wish",
    description:
      "For the next 24 hours, whenever you encounter a stranger or known enemy, you must make a Sanity Save or immediately attack them.",
  },
  {
    conditionType: "catatonic",
    name: "Catatonic",
    description: "Become unresponsive and unmoving for 2d10 minutes.",
  },
  {
    conditionType: "spiraling",
    name: "Spiraling",
    description: "You make Panic Checks with Disadvantage.",
  },
  {
    conditionType: "heartAttack",
    name: "Heart Attack",
    description: "Gain [-] on all rolls for 1d10 hours.",
  },
];

export const allConditionDefinitionsDict: Record<
  ConditionType,
  ConditionDefinition
> = toDict(allConditionDefinitions, (c) => c.conditionType);

export const classDefinitions: ClassDefinition[] = [
  {
    name: "teamster",
    traumaResponse: "Once per session, you may take advantage on a panic check",
    initialSkills: [
      "Industrial Equipment, Zero-G",
      "Bonus: 1 Trained Skill and 1 Expert Skill",
    ],
  },
  {
    name: "android",
    traumaResponse:
      "Fear saves made by close friendly players are at disadvantage",
    initialSkills: [
      "Linguistics, Computers, Mathematics",
      "Bonus: 1 Expert Skill",
      "OR: 2 Trained Skills",
    ],
  },
  {
    name: "scientist",
    traumaResponse:
      "Whenever you fail a sanity save, all close friendly players gain 1 stress",
    initialSkills: [
      "1 Master Skill and an Expert and Trained Skill Prerequisite",
      "Bonus: 1 Trained Skill",
    ],
  },
  {
    name: "marine",
    traumaResponse:
      "Whenever you panic, every close friendly player must make a fear save",
    initialSkills: [
      "Military Training, Athletics",
      "Bonus: 1 Expert Skill",
      "OR: 2 Trained Skills",
    ],
  },
];

export const classDefinitionsDict = toDict(classDefinitions, (c) => c.name);

export const allArmors: Armor[] = [
  {
    armorType: "standardCrewAttire",
    id: "",
    name: "Standard Crew Attire",
    equipped: true,
    armorPoints: 1,
    cost: 100,
    oxygenSupply: 0,
    notes: "",
    armorSpeed: "normal",
  },
  {
    armorType: "advancedBattleDress",
    id: "",
    name: "Advanced Battle Dress",
    equipped: true,
    armorPoints: 10,
    cost: 12000,
    oxygenSupply: 1,
    notes:
      "Includes short-range comms, body cam, headlamp, HUD, exoskeleton weave ([+] on Strength Checks), and radiation shielding. Ignores the first Wound you suffer.",
    armorSpeed: "disadvantage",
  },
  {
    armorType: "standardBattleDress",
    id: "",
    name: "Standard Battle Dress",
    equipped: true,
    armorPoints: 7,
    cost: 2000,
    oxygenSupply: 0,
    notes: "Includes short-range comms.",
    armorSpeed: "normal",
  },
  {
    armorType: "hazardSuit",
    id: "",
    name: "Hazard Suit",
    equipped: true,
    armorPoints: 5,
    cost: 4000,
    oxygenSupply: 1,
    notes:
      "Includes air filter, extreme heat/cold protection, hydration reclamation (1L of water lasts 4 days), short-range comms, headlamp, and radiation shielding.",
    armorSpeed: "normal",
  },
  {
    armorType: "vaccsuit",
    id: "",
    name: "Vaccsuit",
    equipped: true,
    armorPoints: 3,
    cost: 10000,
    oxygenSupply: 12,
    notes:
      "Includes short-range comms, headlamp, and radiation shielding. Decompression within 1d5 rounds if punctured.",
    armorSpeed: "disadvantage",
  },
];

export const allMotivations: Motivation[] = [
  {
    motivation: "Secretely investigating a Corporate cover-up.",
    probability: { min: 0, max: 0 },
  },
  {
    motivation: "Sending money back home to family.",
    probability: { min: 1, max: 9 },
  },
  {
    motivation: "Needs to pay off a loan shark badly.",
    probability: { min: 10, max: 19 },
  },
  {
    motivation: "Can’t stop in one place for too long, gets restless.",
    probability: { min: 20, max: 24 },
  },
  {
    motivation: "Hears a call from an entity they can’t explain.",
    probability: { min: 25, max: 29 },
  },
  {
    motivation: "Using you/your ship to smuggle contraband.",
    probability: { min: 30, max: 34 },
  },
  { motivation: "Revenge.", probability: { min: 35, max: 39 } },
  {
    motivation: "Secretely a con artist with no other expertise.",
    probability: { min: 40, max: 44 },
  },
  {
    motivation: "Paying a loved one’s medical bills.",
    probability: { min: 45, max: 49 },
  },
  {
    motivation: "Secretely a spy for a rival corporation.",
    probability: { min: 50, max: 54 },
  },
  {
    motivation: "Need to pay off jumped bail or a court fine.",
    probability: { min: 55, max: 59 },
  },
  {
    motivation: "Undercover secret police investigating your crew.",
    probability: { min: 60, max: 64 },
  },
  {
    motivation: "In huge debt to a powerful crime syndicate.",
    probability: { min: 65, max: 69 },
  },
  {
    motivation: "Took the money and ran out on their last job.",
    probability: { min: 70, max: 74 },
  },
  {
    motivation: "Family member held hostage, needs ransom.",
    probability: { min: 75, max: 79 },
  },
  {
    motivation: "Secretly a bounty hunter looking for your crew.",
    probability: { min: 80, max: 84 },
  },
  {
    motivation: "Seeking an honorable and glorious death.",
    probability: { min: 85, max: 89 },
  },
  {
    motivation: "Unknowingly contagious with a deadly disease.",
    probability: { min: 90, max: 94 },
  },
  {
    motivation: "Escaped from a corporate research facility.",
    probability: { min: 95, max: 98 },
  },
  {
    motivation: "Secretely a wanted serial killer in hiding.",
    probability: { min: 99, max: 99 },
  },
];

export const allArmorDict: Record<ArmorType, Armor> = toDict(
  allArmors,
  (a) => a.armorType
);

export const trinkets: string[] = [
  "Manual:PANIC: Harbinger of Catastrophe",
  "Antique Company Script (Asteroid Mine)",
  "Manual: SURVIVAL: Eat Soup With a Knife",
  "Dessicated Husk Doll",
  "Alien Pressed Flower (common)",
  "Necklace of Shell Casings",
  "Corroded Android Logic Core",
  "Pamphlet: Signs of Parasitical Infection",
  "Manual: Treat Your Rifle Like A Lady",
  "Bone Knife",
  "Calendar: Alien Pin-Up Art",
  "Rejected Application (Colony Ship)",
  "Holographic Serpentine Dancer",
  "Snake Whiskey",
  "Medical Container, Purple Powder",
  "Pills: Male Enhancement, Shoddy",
  "Casino Playing Cards",
  "Lagomorph Foot",
  "Moonstone Ring",
  "Manual: Mining Safety and You",
  "Pamphlet: Against Human Simulacrum",
  "Animal Skull, 3 Eyes, Curled Horns",
  "Bartender’s Certification (Expired)",
  "Bunraku Puppet",
  "Prospecting Mug, Dented",
  "Eerie Mask",
  "Ultrablack Marble",
  "Ivory Dice",
  "Tarot Cards, Worn, Pyrite Gilded Edges",
  "Bag of Assorted Teeth",
  "Ashes (A Relative)",
  "DNR Beacon Necklace",
  "Cigarettes (Grinning Skull)",
  "Pills: Areca Nut",
  "Pendant: Shell Fragments Suspended in Plastic",
  "Pamphlet: Zen and the Art of Cargo Arrangement",
  "Pair of Shot Glasses (Spent Shotgun Shells)",
  "Key (Childhood Home)",
  "Dog Tags (Heirloom)",
  "Token: “Is Your Morale Improving?”",
  "Pamphlet: The Relic of Flesh",
  "Pamphlet: The Indifferent Stars",
  "Calendar: Military Battles",
  "Manual: Rich Captain, Poor Captain",
  "Campaign Poster (Home Planet)",
  "Preserved Insectile Aberration",
  "Titanium Toothpick",
  "Gloves, Leather (Xenomorph Hide)",
  "Smut (Seditious): The Captain, Ordered",
  "Towel, Slightly Frayed",
  "Brass Knuckles",
  "Fuzzy Handcuffs",
  "Journal of Grudges",
  "Stylized Cigarette Case",
  "Ball of Assorted Gauge Wire",
  "Spanner",
  "Switchblade, Ornamental",
  "Powdered Xenomorph Horn",
  "Bonsai Tree, Potted",
  "Golf Club (Putter)",
  "Trilobite Fossil",
  "Pamphlet: A Lover In Every Port",
  "Patched Overalls, Personalized",
  "Fleshy Thing Sealed in a Murky Jar",
  "Spiked Bracelet",
  "Harmonica",
  "Pictorial Pornography, Dogeared, Well-thumbed",
  "Coffee Cup, Chipped, reads: HAPPINESS IS MANDATORY",
  "Manual: Moonshining With Gun Oil & Fuel",
  "Miniature Chess Set, Bone, Pieces Missing",
  "Gyroscope, Bent, Tin",
  "Faded Green Poker Chip",
  "Ukulele",
  "Spray Paint",
  "Wanted Poster, Weathered",
  "Locket, Hair Braid",
  "Sculpture of a Rat (Gold)",
  "Blanket, Fire Retardant",
  "Hooded Parka, Fleece-Lined",
  "BB Gun",
  "Flint Hatchet",
  "Pendant: Two Astronauts form a Skull",
  "Rubik's Cube",
  "Stress Ball, reads: Zero Stress in Zero G",
  "Sputnik Pin",
  "Ushanka",
  "Trucker Cap, Mesh, Grey Alien Logo",
  "Menthol Balm",
  "Pith Helmet",
  "10m x 10m Tarp",
  "I Ching, Missing Sticks",
  "Kukri",
  "Trench Shovel",
  "Shiv, Sharpened Butter Knife",
  "Taxidermied Cat",
  "Pamphlet: Interpreting Sheep Dreams",
  "Faded Photograph, A Windswept Heath",
  "Opera Glasses",
  "Pamphlet: Android Overlords",
  "Interstellar Compass, Always Points to Homeworld",
];

export const patches: string[] = [
  "“I’m Not A Rocket Scientist / But You’re An Idiot”",
  "Medic Patch (Skull and Crossbones over Cross)",
  "“Don’t Run You’ll Only Die Tired” Backpatch",
  "Red Shirt Logo",
  "Blood Type (Reference Patch)",
  "“Do I LOOK Like An Expert?”",
  "Biohazard Symbol",
  "Mr. Yuck",
  "Nuclear Symbol",
  "“Eat The Rich”",
  "“Be Sure: Doubletap”",
  "Flame Emoji",
  "Smiley Face (Glow in the Dark)",
  "“Smile: Big Brother is Watching”",
  "Jolly Roger",
  "Viking Skull",
  "“APEX PREDATOR” (Sabertooth Skull)",
  "Pin-Up Model (Ace of Spades)",
  "Queen of Hearts",
  "Security Guard",
  "“LONER”",
  "Front Towards Enemy (Claymore Mine)",
  "Pin-Up Model (Riding Missile)",
  "FUBAR",
  "“I’m A (Love) Machine”",
  "Pin-Up Model (Mechanic)",
  "HELLO MY NAME IS:",
  "“Powered By Coffee”",
  "“Take Me To Your Leader” (UFO)",
  "“DO YOUR JOB”",
  "“Take My Life (Please)”",
  "“Upstanding Citizen”",
  "Allergic To Bullshit (Medical Style Patch)",
  "“Fix Me First” (Caduceus) *Aces Full Of Eights",
  "“I Like My Tools Clean / And My Lovers Dirty”",
  "Pin-Up Model (Nurse): “The Louder You Scream the Faster I Come”",
  "HMFIC (Head Mother Fucker In Charge)",
  "Dove in Crosshairs",
  "Chibi Cthulhu",
  "“Welcome to the DANGER ZONE”",
  "Skull and Crossed Wrenches",
  "Pin-Up Model (Succubus)",
  "“DILLIGAF?”",
  "“DRINK / FIGHT / FUCK”",
  "“Work Hard / Party Harder”",
  "Mudflap Girl",
  "Fun Meter (reads: Bad Time)",
  "“GAME OVER” (Bride & Groom)",
  "Heart",
  "“IMPROVE / ADAPT / OVERCOME”",
  "“SUCK IT UP”",
  "“Cowboy Up” (Crossed Revolvers)",
  "“Troubleshooter”",
  "NASA Logo",
  "Crossed Hammers with Wings",
  "“Keep Well Lubricated”",
  "Soviet Hammer & Sickle",
  "“Plays Well With Others”",
  "“Live Free and Die”",
  "“IF I’M RUNNING KEEP UP” Backpatch",
  "“Meat Bag”",
  "“I Am Not A Robot”",
  "Red Gear",
  "“I Can’t Fix Stupid”",
  "“Space IS My Home” (Sad Astronaut)",
  "All Seeing Eye",
  "Poker Hand: Dead Man’s Hand*",
  "“All Out of Fucks To Give” (Astronaut with Turned Out Pockets)",
  "“Travel To Distant Places / Meet Unusual Things / Get Eaten”",
  "BOHICA (Bend Over Here It Comes Again)",
  "“I Am My Brother’s Keeper”",
  "“Mama Tried”",
  "Black Widow Spider",
  "“My Other Ride Married You”",
  "“One Size Fits All” (Grenade)",
  "Grim Reaper Backpatch",
  "отъебись (Get Fucked, Russian)",
  "“Smooth Operator”",
  "Atom Symbol",
  "“For Science!”",
  "“Actually, I AM A Rocket Scientist”",
  "“Help Wanted”",
  "Princess",
  "“NOMAD”",
  "“GOOD BOY”",
  "Dice (Snake Eyes)",
  "“#1 Worker”",
  "“Good” (Brain)",
  "“Bad Bitch”",
  "“Too Pretty To Die”",
  "“Fuck Forever” (Roses)",
  "Icarus",
  "”Girl’s Best Friend” (Diamond)",
  "Risk of Electrocution Symbol",
  "Inverted Cross",
  "“Do You Sign My Paychecks?” Backpatch",
  "“I ♥ Myself”",
  "Double Cherry",
  "“Volunteer”",
  "“Solve Et Coagula” (Baphomet)",
];
