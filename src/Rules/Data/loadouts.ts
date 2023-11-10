import { allArmorDict } from "Rules/data";
import {
  Armor,
  ArmorType,
  CharacterClass,
  Equipment,
  Loadout,
  Weapon,
} from "Rules/types";
import { allWeaponDict } from "./weapons";
import { allEquipmentDict } from "./equipment";

interface DataRef<T> {
  ref: string;
  custom?: Partial<T>;
}

export interface LoadoutRef {
  armors: DataRef<Armor>[];
  weapons: DataRef<Weapon>[];
  equipments: DataRef<Equipment>[];
}

const baseEquipment: Equipment = {
  id: "",
  name: "",
  description: "",
  equipped: true,
  quantity: 1,
  cost: 10,
  baseType: "",
};

function simpleEquipment(name: string, custom: Partial<Equipment>) {
  return {
    ref: "",
    custom: { ...baseEquipment, ...custom, name, baseType: name.toLowerCase() },
  };
}

const fatigues: DataRef<Armor> = {
  ref: "standardCrewAttire",
  custom: {
    armorType: "fatigues",
    name: "Fatigues",
    armorPoints: 2,
    cost: 50,
  },
};

const labCoat: DataRef<Armor> = {
  ref: "standardCrewAttire",
  custom: {
    armorType: "labCoat" as ArmorType,
    name: "Lab Coat",
  },
};

const scrubs: DataRef<Armor> = {
  ref: "standardCrewAttire",
  custom: {
    armorType: "scrubs" as ArmorType,
    name: "Scrubs",
  },
};

const workClothes: DataRef<Armor> = {
  ref: "standardCrewAttire",
  custom: {
    armorType: "workClothes" as ArmorType,
    name: "Heavy Duty Work Clothes",
    armorPoints: 2,
    cost: 50,
  },
};

function instantiateArmor(ref: DataRef<Armor>): Armor {
  const model = allArmorDict[ref.ref as ArmorType];
  if (model === undefined) {
    console.error(`armor ref not found: ${ref.ref}`);
  }
  return { ...model, ...ref.custom };
}

function instantiateWeapon(ref: DataRef<Weapon>): Weapon {
  const model = allWeaponDict[ref.ref];
  if (model === undefined) {
    console.error(`weapon ref not found: ${ref.ref}`);
  }
  return { ...model, ...ref.custom };
}

function instantiateEquipment(ref: DataRef<Equipment>): Equipment {
  let model = allEquipmentDict[ref.ref];
  if (model === undefined) {
    if (ref.ref.length > 0) {
      console.error(`equipment ref not found: ${ref.ref}`);
    }
    model = baseEquipment;
  }

  return { ...model, ...ref.custom };
}

export function instantiateLoadout(ref: LoadoutRef): Loadout {
  return {
    armors: ref.armors.map(instantiateArmor),
    weapons: ref.weapons.map(instantiateWeapon),
    equipments: ref.equipments.map(instantiateEquipment),
  };
}

export const loadoutRefs: Record<CharacterClass, LoadoutRef[]> = {
  marine: [
    {
      armors: [
        {
          ref: "standardCrewAttire",
          custom: {
            name: "Tank Top and Camo Pants",
            armorType: "tankTopandCamoPants" as ArmorType,
          },
        },
      ],
      weapons: [
        {
          ref: "scalpel",
          custom: {
            weaponType: "Combat Knife",
            baseType: "knife",
            damageString: "1d5 DMG [+]",
            damage: [{ damageType: "xd5", amount: 1, rollMode: "advantage" }],
          },
        },
      ],
      equipments: [{ ref: "stimpak", custom: { quantity: 5 } }],
    },
    {
      armors: [{ ref: "advancedBattleDress" }],
      weapons: [{ ref: "flamethrower" }, { ref: "boardingAxe" }],
      equipments: [],
    },
    {
      armors: [{ ref: "standardBattleDress" }],
      weapons: [{ ref: "combatShotgun", custom: { magazines: 0 } }],
      equipments: [
        { ref: "rucksack" },
        simpleEquipment("Camping Gear", { cost: 50 }),
      ],
    },
    {
      armors: [{ ref: "standardBattleDress" }],
      weapons: [{ ref: "pulseRifle", custom: { magazines: 3 } }],
      equipments: [{ ref: "infraredGoggles" }],
    },
    {
      armors: [{ ref: "standardBattleDress" }],
      weapons: [{ ref: "smartRifle", custom: { magazines: 3 } }],
      equipments: [{ ref: "binoculars" }, { ref: "personalLocator" }],
    },
    {
      armors: [{ ref: "standardBattleDress" }],
      weapons: [{ ref: "smg", custom: { magazines: 3 } }],
      equipments: [{ ref: "mre" }],
    },
    {
      armors: [fatigues],
      weapons: [{ ref: "combatShotgun", custom: { magazines: 0, shots: 2 } }],
      equipments: [
        simpleEquipment("Dog", { cost: 120 }),
        simpleEquipment("Leash", { cost: 10 }),
        simpleEquipment("Tennis ball", { cost: 10 }),
      ],
    },
    {
      armors: [fatigues],
      weapons: [
        { ref: "revolver" },
        { ref: "fragGrenade", custom: { magazines: 0 } },
      ],
      equipments: [],
    },
    {
      armors: [{ ref: "standardCrewAttire" }],
      weapons: [{ ref: "revolver", custom: { magazines: 0, shots: 1 } }],
      equipments: [simpleEquipment("Challenge Coin", { cost: 10 })],
    },
    {
      armors: [{ ref: "advancedBattleDress" }],
      weapons: [{ ref: "heavyMachineGun" }],
      equipments: [{ ref: "headsUpDisplayHUD" }],
    },
  ],
  android: [
    {
      armors: [{ ref: "vaccsuit" }],
      weapons: [{ ref: "smartRifle", custom: { magazines: 2 } }],
      equipments: [{ ref: "infraredGoggles" }, { ref: "mylarBlanket" }],
    },
    {
      armors: [{ ref: "vaccsuit" }],
      weapons: [{ ref: "revolver" }],
      equipments: [
        { ref: "longrangecomms" },
        simpleEquipment("Satchel", { cost: 500 }),
      ],
    },
    {
      armors: [{ ref: "hazardSuit" }],
      weapons: [{ ref: "revolver", custom: { magazines: 0 } }],
      equipments: [
        simpleEquipment("Defibrillator", { cost: 500 }),
        { ref: "firstAidKit" },
        { ref: "flashlight" },
      ],
    },
    {
      armors: [{ ref: "hazardSuit" }],
      weapons: [{ ref: "foamGun", custom: { magazines: 0, shots: 2 } }],
      equipments: [{ ref: "sampleKit" }, simpleEquipment("Screwdriver", {})],
    },
    {
      armors: [{ ref: "standardBattleDress" }],
      weapons: [{ ref: "tranqPistol", custom: { magazines: 0, shots: 3 } }],
      equipments: [{ ref: "paracord", custom: { quantity: 2 } }],
    },
    {
      armors: [{ ref: "standardCrewAttire" }],
      weapons: [{ ref: "stunBaton" }],
      equipments: [{ ref: "petOrganic" }],
    },
    {
      armors: [{ ref: "standardCrewAttire" }],
      weapons: [{ ref: "scalpel" }],
      equipments: [{ ref: "bioscanner" }],
    },
    {
      armors: [{ ref: "standardCrewAttire" }],
      weapons: [
        { ref: "fragGrenade", custom: { magazines: 0, shots: 1 } },
        {
          ref: "scalpel",
          custom: { weaponType: "Pen knife", baseType: "penKnife" },
        },
      ],
      equipments: [],
    },
    {
      armors: [
        {
          ref: "standardCrewAttire",
          custom: {
            name: "Manufacturer Supplied Attire",
            armorType: "manufacturerSuppliedAttire" as ArmorType,
          },
        },
      ],
      weapons: [],
      equipments: [
        simpleEquipment("Jump-9 ticket (destination blank)", { cost: 5000 }),
      ],
    },
    {
      armors: [
        {
          ref: "standardCrewAttire",
          custom: {
            name: "Corporate Attire",
            armorType: "corporateAttire" as ArmorType,
          },
        },
      ],
      weapons: [],
      equipments: [simpleEquipment("VIP Corporate key card", { cost: 10000 })],
    },
  ],
  scientist: [
    {
      armors: [{ ref: "hazardSuit" }],
      weapons: [{ ref: "tranqPistol", custom: { magazines: 0, shots: 3 } }],
      equipments: [{ ref: "bioscanner" }, { ref: "sampleKit" }],
    },
    {
      armors: [{ ref: "hazardSuit" }],
      weapons: [{ ref: "flamethrower", custom: { magazines: 0, shots: 1 } }],
      equipments: [{ ref: "stimpak" }, { ref: "electronicToolSet" }],
    },
    {
      armors: [{ ref: "vaccsuit" }],
      weapons: [{ ref: "riggingGun" }],
      equipments: [
        { ref: "sampleKit" },
        { ref: "flashlight" },
        { ref: "petOrganic", custom: { name: "Lab rat", baseType: "labRat" } },
      ],
    },
    {
      armors: [{ ref: "vaccsuit" }],
      weapons: [{ ref: "foamGun", custom: { magazines: 0, shots: 2 } }],
      equipments: [{ ref: "foldableStretcher" }, { ref: "firstAidKit" }, { ref: "radiationPills" }],
    },
    {
      armors: [labCoat],
      weapons: [],
      equipments: [
        simpleEquipment("Screwdriver", {}),
        { ref: "medscanner" },
        simpleEquipment("Vaccine", {}),
      ],
    },
    {
      armors: [labCoat],
      weapons: [],
      equipments: [
        { ref: "cyberneticDiagnostic" },
        { ref: "portableComputerTerminal" },
      ],
    },
    {
      armors: [scrubs],
      weapons: [{ ref: "scalpel" }],
      equipments: [
        { ref: "automed" },
        { ref: "oxygenTank" },
        simpleEquipment("Filter mask", { cost: 50 }),
      ],
    },
    {
      armors: [scrubs],
      weapons: [],
      equipments: [
        simpleEquipment("Vial of acid", { cost: 100 }),
        { ref: "mylarBlanket" },
        { ref: "firstAidKit" },
      ],
    },
    {
      armors: [{ ref: "standardCrewAttire" }],
      weapons: [{ ref: "scalpel", custom: { weaponType: "Utility knife", baseType: "utilityKnife" } }],
      equipments: [
        { ref: "cyberneticDiagnostic" },
        simpleEquipment("Duct Tape", {}),
      ],
    },
    {
      armors: [
        {
          ref: "standardCrewAttire",
          custom: {
            name: "Civilian clothes",
            armorType: "civilianClothes" as ArmorType,
          },
        },
      ],
      weapons: [],
      equipments: [
        simpleEquipment("Briefcase", { cost: 50 }),
        simpleEquipment("Prescription pad", {}),
        simpleEquipment("Fountain pen (Poison injector)", { cost: 100 }),
      ],
    },
  ],
  teamster: [
    {
      armors: [{ ref: "vaccsuit" }],
      weapons: [{ ref: "laserCutter" }],
      equipments: [{ ref: "patchKit" }, { ref: "assortedTools" }],
    },
    {
      armors: [{ ref: "vaccsuit" }],
      weapons: [{ ref: "revolver", custom: { magazines: 0 } }, { ref: "crowbar" }],
      equipments: [{ ref: "flashlight" }],
    },
    {
      armors: [{ ref: "vaccsuit" }],
      weapons: [{ ref: "riggingGun" }],
      equipments: [simpleEquipment("Shovel", {}), { ref: "droneSalvage" }],
    },
    {
      armors: [{ ref: "hazardSuit" }],
      weapons: [{ ref: "vibechete" }],
      equipments: [
        simpleEquipment("Spanner", {}),
        simpleEquipment("Campign gear", {}),
        { ref: "waterFiltrationDevice" },
      ],
    },
    {
      armors: [workClothes],
      weapons: [],
      equipments: [
        { ref: "explosivesDetonator" },
        simpleEquipment("Cigarettes", {}),
      ],
    },
    {
      armors: [workClothes],
      weapons: [],
      equipments: [
        simpleEquipment("Drill", { cost: 20 }),
        { ref: "paracord" },
        { ref: "droneSalvage" },
      ],
    },
    {
      armors: [{ ref: "standardCrewAttire" }],
      weapons: [{ ref: "combatShotgun", custom: { magazines: 0, shots: 4 } }],
      equipments: [
        simpleEquipment("Extension cord", { cost: 50 }),
        { ref: "petOrganic", custom: { name: "Cat", baseType: "cat" } },
      ],
    },
    {
      armors: [{ ref: "standardCrewAttire" }],
      weapons: [{ ref: "nailGun", custom: { magazines: 0 } }],
      equipments: [
        simpleEquipment("Head Lamp", {}),
        { ref: "assortedTools", custom: { name: "Toolbelt", baseType: "toolbelt" } },
        simpleEquipment("Lunch Box", {}),
      ],
    },
    {
      armors: [{ ref: "standardCrewAttire" }],
      weapons: [{ ref: "flareGun", custom: { magazines: 0 } }],
      equipments: [
        { ref: "waterFiltrationDevice" },
        { ref: "personalLocator" },
        simpleEquipment("Subsurface Scanner", { cost: 500 }),
      ],
    },
    {
      armors: [
        {
          ref: "standardCrewAttire",
          custom: {
            name: "Lounge Wear",
            armorType: "loungeWear" as ArmorType,
          },
        },
      ],
      weapons: [{ ref: "crowbar" }],
      equipments: [
        { ref: "painPills" },
        simpleEquipment("Six pack of beer", {}),
      ],
    },
  ],
};

