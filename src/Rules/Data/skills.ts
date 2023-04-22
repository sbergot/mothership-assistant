import { SkillDefinition, SkillDefinitionExtended, SkillLevel, SkillLevelDefinition, SkillType } from "Rules/types";
import { toDict } from "Services/services";

export const allSkillLevels: SkillLevel[] = ["Trained", "Expert", "Master"];

export const allSkillLevelDefinitions: SkillLevelDefinition[] = [
  {
    level: "Trained",
    trainingCost: 10000,
    trainingTimeYear: 2,
    bonus: 10,
  },
  {
    level: "Expert",
    trainingCost: 50000,
    trainingTimeYear: 4,
    bonus: 15,
  },
  {
    level: "Master",
    trainingCost: 200000,
    trainingTimeYear: 6,
    bonus: 20,
  },
];

export const allSkillLevelDefinitionDict: Record<
  SkillLevel,
  SkillLevelDefinition
> = toDict(allSkillLevelDefinitions, (sld) => sld.level);

export const allSkills: SkillDefinition[] = [
    {
      key: "linguistics",
      name: "linguistics",
      level: "Trained",
      description: "The study of languages (alive, dead, and undiscovered).",
      prerequisites: [],
    },
    {
      key: "computers",
      name: "computers",
      level: "Trained",
      description: "Fluent use of computers and their networks.",
      prerequisites: [],
    },
    {
      key: "mathematics",
      name: "mathematics",
      level: "Trained",
      description: "The study of numbers, quantity, and space.",
      prerequisites: [],
    },
    {
      key: "archaelogy",
      name: "archaelogy",
      level: "Trained",
      description: "Ancient cultures and artifacts.",
      prerequisites: [],
    },
    {
      key: "rimwise",
      name: "rimwise",
      level: "Trained",
      description:
        "Practical knowledge and know-how regarding outer rim colonies, their customs, and the seedier parts of the galaxy.",
      prerequisites: [],
    },
    {
      key: "art",
      name: "art",
      level: "Trained",
      description:
        "The expression or application of a species’ creative ability and imagination.",
      prerequisites: [],
    },
    {
      key: "athletics",
      name: "athletics",
      level: "Trained",
      description: "Physical fitness, sports, and games.",
      prerequisites: [],
    },
    {
      key: "botany",
      name: "botany",
      level: "Trained",
      description: "The study of plant life.",
      prerequisites: [],
    },
    {
      key: "chemistry",
      name: "chemistry",
      level: "Trained",
      description: "The study of matter and its chemical elements and compounds.",
      prerequisites: [],
    },
    {
      key: "geology",
      name: "geology",
      level: "Trained",
      description:
        "The study of the solid features of any terrestrial planet or its satellites.",
      prerequisites: [],
    },
    {
      key: "industrialEquipment",
      name: "industrial equipment",
      level: "Trained",
      description:
        "The safe and proper use of heavy machinery and tools (exosuits, forklifts, drills, breakers, laser cutters, etc.).",
      prerequisites: [],
    },
    {
      key: "juryRigging",
      name: "jury rigging",
      level: "Trained",
      description:
        "Makeshift repair, using only the tools and materials at hand.",
      prerequisites: [],
    },
    {
      key: "militaryTraining",
      name: "military training",
      level: "Trained",
      description: "Basic training provided to all military personnel.",
      prerequisites: [],
    },
    {
      key: "theology",
      name: "theology",
      level: "Trained",
      description: "The study of the divine or devotion to a religion.",
      prerequisites: [],
    },
    {
      key: "zeroG",
      name: "zero-G",
      level: "Trained",
      description:
        "Practice and know-how of working in a vacuum, orientation, vaccsuit operation, etc.",
      prerequisites: [],
    },
    {
      key: "zoology",
      name: "zoology",
      level: "Trained",
      description: "The study of animal life.",
      prerequisites: [],
    },
    {
      key: "asteroidMining",
      name: "asteroid mining",
      level: "Expert",
      description:
        "Training in the tools and procedures used for mining asteroids.",
      prerequisites: ["geology", "industrialEquipment"],
    },
    {
      key: "ecology",
      name: "ecology",
      level: "Expert",
      description:
        "The study of organisms and how they relate to their environment.",
      prerequisites: ["botany", "geology"],
    },
    {
      key: "explosives",
      name: "explosives",
      level: "Expert",
      description:
        "Design and effective use of explosive devices (bombs, grenade, shells, land mines, etc.).",
      prerequisites: ["juryRigging", "chemistry"],
    },
    {
      key: "fieldMedicine",
      name: "field medicine",
      level: "Expert",
      description: "Emergency medical care and treatment.",
      prerequisites: ["zoology", "botany"],
    },
    {
      key: "firearms",
      name: "firearms",
      level: "Expert",
      description: "Safe and effective use of guns.",
      prerequisites: ["rimwise", "militaryTraining"],
    },
    {
      key: "hacking",
      name: "hacking",
      level: "Expert",
      description: "Unauthorized access to computer systems and networks.",
      prerequisites: ["computers"],
    },
    {
      key: "handToHandCombat",
      name: "handToHand combat",
      level: "Expert",
      description: "Melee fighting.",
      prerequisites: ["athletics", "rimwise", "militaryTraining"],
    },
    {
      key: "mechanicalRepair",
      name: "mechanical repair",
      level: "Expert",
      description: "Fixing broken machines.",
      prerequisites: ["industrialEquipment", "juryRigging"],
    },
    {
      key: "mysticism",
      name: "mysticism",
      level: "Expert",
      description: "Spiritual apprehension of hidden knowledge.",
      prerequisites: ["art", "archaelogy", "theology"],
    },
    {
      key: "pathology",
      name: "pathology",
      level: "Expert",
      description: "Study of the causes and effects of diseases.",
      prerequisites: ["botany", "zoology"],
    },
    {
      key: "pharmacology",
      name: "pharmacology",
      level: "Expert",
      description: "Study of drugs and medication.",
      prerequisites: ["chemistry"],
    },
    {
      key: "physics",
      name: "physics",
      level: "Expert",
      description:
        " Study of matter, motion, energy, and their effects in space and time.",
      prerequisites: ["mathematics"],
    },
    {
      key: "piloting",
      name: "piloting",
      level: "Expert",
      description:
        "Operation and control of aircraft, spacecraft, and other vehicles.",
      prerequisites: ["zeroG"],
    },
    {
      key: "psychology",
      name: "psychology",
      level: "Expert",
      description: "The study of behavior and the human mind.",
      prerequisites: ["zoology", "botany"],
    },
    {
      key: "wildernessSurvival",
      name: "wilderness survival",
      level: "Expert",
      description:
        "Applicable know-how regarding the basic necessities of life (food, water, shelter) in a natural environment.",
      prerequisites: ["botany", "militaryTraining"],
    },
    {
      key: "ai",
      name: "Artificial Intelligence",
      level: "Master",
      description: "The study of intelligence as demonstrated by machines.",
      prerequisites: ["hacking"],
    },
    {
      key: "command",
      name: "command",
      level: "Master",
      description: "Leadership, management, and authority.",
      prerequisites: ["firearms", "piloting"],
    },
    {
      key: "cybernetics",
      name: "cybernetics",
      level: "Master",
      description:
        "The physical and neural interfaces between organisms and machines.",
      prerequisites: ["mechanicalRepair"],
    },
    {
      key: "engineering",
      name: "engineering",
      level: "Master",
      description:
        "The design, building, and use of engines, machines, and structures.",
      prerequisites: ["mechanicalRepair"],
    },
    {
      key: "exobiology",
      name: "exobiology",
      level: "Master",
      description: "The study of and search for intelligent alien life.",
      prerequisites: ["pathology"],
    },
    {
      key: "hyperspace",
      name: "hyperspace",
      level: "Master",
      description: "Faster-than-light travel.",
      prerequisites: ["physics", "mysticism", "piloting"],
    },
    {
      key: "planetology",
      name: "planetology",
      level: "Master",
      description: "Study of planets and other celestial bodies.",
      prerequisites: ["ecology", "asteroidMining"],
    },
    {
      key: "robotics",
      name: "robotics",
      level: "Master",
      description:
        "Design, maintenance, and operation of robots, drones, and androids.",
      prerequisites: ["mechanicalRepair"],
    },
    {
      key: "sophontology",
      name: "sophontology",
      level: "Master",
      description: "The study of the behavior and mind of inhuman entities",
      prerequisites: ["psychology", "linguistics"],
    },
    {
      key: "surgery",
      name: "surgery",
      level: "Master",
      description: "Manually operating on living or dead biological subjects.",
      prerequisites: ["fieldMedicine", "pathology"],
    },
    {
      key: "xenoesoterism",
      name: "xenoesoterism",
      level: "Master",
      description:
        "Obscure beliefs, mysticism, and religion regarding non-human entities.",
      prerequisites: ["mysticism"],
    },
  ];
  
  function buildSkillData(): Record<SkillType, SkillDefinitionExtended> {
    const res = toDict(
      allSkills.map((s) => ({ ...s, unlocks: [] as SkillType[] })),
      (s) => s.key
    );
    Object.values(res).forEach((skill1) =>
      skill1.prerequisites.forEach((skill2) => {
        res[skill2].unlocks.push(skill1.key);
      })
    );
    return res;
  }
  
  export const allSkillsDict: Record<SkillType, SkillDefinitionExtended> =
    buildSkillData();
  