import { Equipment } from "Rules/types";
import { toDict } from "Services/services";

export const allEquipment: Equipment[] = [
  {
    id: "",
    name: "Assorted Tools",
    description:
      "Wrenches, spanners, screwdrivers, etc. Can be used as weapons (doing the same Damage as a Crowbar).",
    equipped: true,
    quantity: 0,
    cost: 20,
    baseType: "assortedTools",
  },
  {
    id: "",
    name: "Automed",
    description:
      "Nanotech pills that assist your body in repairing Damage by granting Advantage to Body Saves meant to repel disease and poison, as well as attempts to heal from rest.",
    equipped: true,
    quantity: 5,
    cost: 1500,
    baseType: "automed",
  },
  {
    id: "",
    name: "Binoculars",
    description:
      "20x magnification. Add thermal vision (+300cr) or night vision (+1kcr).",
    equipped: true,
    quantity: 1,
    cost: 300,
    baseType: "binoculars",
  },
  {
    id: "",
    name: "Bioscanner",
    description:
      "Allows the user to scan the immediate area for signs of life. Generally can scan for 100m in all directions, without being blocked by most known metals. Can tell the location of signs of life, but not what that life is.",
    equipped: true,
    quantity: 1,
    cost: 150,
    baseType: "bioscanner",
  },
  {
    id: "",
    name: "Body Cam",
    description:
      "A camera worn on your clothing that can stream video back to a control center so your other crewmembers can see what you’re seeing. Add thermal vision (+300cr) or night vision (+1kcr).",
    equipped: true,
    quantity: 1,
    cost: 50,
    baseType: "bodyCam",
  },
  {
    id: "",
    name: "Chemlight",
    description:
      "Small disposable glowsticks capable of dim illumination in a 1m radius.",
    equipped: true,
    quantity: 5,
    cost: 5,
    baseType: "chemlight",
  },
  {
    id: "",
    name: "Comms (Short-range)",
    description:
      "Allows communication from ship-to-ship within a reasonable distance, as well as surface-to-surface within a dozen kilometers. Blocked by radio jammer.",
    equipped: true,
    quantity: 1,
    cost: 30,
    baseType: "shortrangecomms",
  },
  {
    id: "",
    name: "Comms (Long-range)",
    description:
      "Rucksack-sized communication device for use in surface-to-ship comunication.",
    equipped: true,
    quantity: 1,
    cost: 65,
    baseType: "longrangecomms",
  },
  {
    id: "",
    name: "Cybernetic Diagnostic Scanner",
    description:
      "Allows the user to scan androids and other cybernetic organisms in order to diagnose any physical or mental issues they may be having. Often distrusted by androids.",
    equipped: true,
    quantity: 1,
    cost: 500,
    baseType: "cyberneticDiagnostic",
  },
  {
    id: "",
    name: "Drone (Recon)",
    description:
      "Remote controlled drone. Requires two hands to operate receiver. Can fly up to 450m high, to a distance of 3km from operator. Battery operated. Can run for 2 hours. Can record and transmit footage to receiver. If purchased separately, can be equipped with up to two of the following (at their regular cost): binoculars, radio jammer, Geiger counter, medscanner, personal locator, infrared goggles, emergency beacon, cybernetic diagnostic scanner, bioscanner.",
    equipped: true,
    quantity: 1,
    cost: 5000,
    baseType: "droneRecon",
  },
  {
    id: "",
    name: "Drone (Salvage)",
    description:
      "Remote controlled drone. Requires two hands to operate receiver. Can fly up to 10m high, to anywhere Long Range from the operator. Battery operated. Can run for 2 hours. Can record and transmit footage to receiver. Can be equipped with a laser cutter if purchased separately. Can carry up to 225kg.",
    equipped: true,
    quantity: 1,
    cost: 10000,
    baseType: "droneSalvage",
  },
  {
    id: "",
    name: "Electronic Tool Set",
    description:
      "A full set of tools for doing detailed repair or construction work on electronics.",
    equipped: true,
    quantity: 1,
    cost: 650,
    baseType: "electronicToolSet",
  },
  {
    id: "",
    name: "Emergency Beacon",
    description:
      "A small device that sends up a flare and then emits a loud beep every few seconds. Additionally, sends out a call on all radio channels to ships or vehicles in the area, but can be blocked by a radio jammer.",
    equipped: true,
    quantity: 1,
    cost: 30,
    baseType: "emergencyBeacon",
  },
  {
    id: "",
    name: "Exoloader",
    description:
      "Open-air mechanical exo-skeleton used for heavy lifting (up to 5000kg). Loader claws deal 1 Wound. User can only wear Standard Crew Attire or Standard Battle Dress while operating. Battery operated (48 hours of use).",
    equipped: true,
    quantity: 1,
    cost: 100000,
    baseType: "exoloader",
  },
  {
    id: "",
    name: "Explosives & Detonator",
    description:
      "Explosive charge powerful enough to blow open an airlock. All Close organisms must make a Body Save or take a Wound (Explosive). Detonator works at Long Range, but can be blocked by a radio jammer.",
    equipped: true,
    quantity: 1,
    cost: 500,
    baseType: "explosivesDetonator",
  },
  {
    id: "",
    name: "First Aid Kit",
    description:
      "An assortment of bandages and treatments to help stop bleeding, bandage cuts, and treat other minor injuries.",
    equipped: true,
    quantity: 1,
    cost: 75,
    baseType: "firstAidKit",
  },
  {
    id: "",
    name: "Flashlight",
    description:
      "Handheld or shoulder mounted. Illuminates 10m ahead of the user.",
    equipped: true,
    quantity: 1,
    cost: 10,
    baseType: "flashlight",
  },
  {
    id: "",
    name: "Foldable Stretcher",
    description:
      "Portable stretcher that can fit within a rucksack. Allows the user to safely strap down the patient and carry them to a location where their wounds can be better treated. Unfolds to roughly 2m.",
    equipped: true,
    quantity: 1,
    cost: 100,
    baseType: "foldableStretcher",
  },
  {
    id: "",
    name: "Geiger Counter",
    description: "Detects radiation and displays radiation levels.",
    equipped: true,
    quantity: 1,
    cost: 20,
    baseType: "geigerCounter",
  },
  {
    id: "",
    name: "Heads-Up Display (HUD)",
    description:
      "Often worn by marines, the HUD allows the wearer to see through the body cams of others in their unit, and can connect to any smart-link upgaded weapon.",
    equipped: true,
    quantity: 1,
    cost: 75,
    baseType: "headsUpDisplayHUD",
  },
  {
    id: "",
    name: "Infrared Goggles",
    description:
      "Allows the wearer to see heat signatures, sometimes up to several hours old. Add night vision for (+1kcr).",
    equipped: true,
    quantity: 1,
    cost: 100,
    baseType: "infraredGoggles",
  },
  {
    id: "",
    name: "Jetpack",
    description:
      "Allows wearer to fly up to 100m high. Fuel-operated for 1 hour. Deals 1d100 DMG if destroyed.",
    equipped: true,
    quantity: 1,
    cost: 75000,
    baseType: "jetpack",
  },
  {
    id: "",
    name: "Lockpick Set",
    description:
      "A highly advanced set of tools meant for hacking basic airlock and electronic door systems.",
    equipped: true,
    quantity: 1,
    cost: 40,
    baseType: "lockpickSet",
  },
  {
    id: "",
    name: "MRE",
    description:
      "“Meals, Ready-to-Eat.” Self-contained, individual field rations in lightweight packaging. Each one has sufficient sustenance for a single person for one day (does not include water).",
    equipped: true,
    quantity: 7,
    cost: 70,
    baseType: "mre",
  },
  {
    id: "",
    name: "Mag-boots",
    description:
      "Grants a magnetic grip to the wearer, allowing them to easily walk on the exterior of a ship (in space, while docked, or free-floating), metal based asteroids, or any other magnetic surface.",
    equipped: true,
    quantity: 1,
    cost: 55,
    baseType: "magboots",
  },
  {
    id: "",
    name: "Medscanner",
    description:
      "Allows the user to scan a living or dead body to analyze it for disease or abnormalities, without having to do a biopsy (or autopsy). Results are often non-instantaneous and may require a lab for analysis.",
    equipped: true,
    quantity: 1,
    cost: 150,
    baseType: "medscanner",
  },
  {
    id: "",
    name: "MoHab Unit",
    description: "Tent, canteen, stove, rucksack, compass, and sleeping bag.",
    equipped: true,
    quantity: 1,
    cost: 1000,
    baseType: "moHabUnit",
  },
  {
    id: "",
    name: "Mylar Blanket",
    description:
      "Lightweight blanket made of heat-reflective material. Often used for thermal control of patients suffering from extreme cold or other trauma.",
    equipped: true,
    quantity: 1,
    cost: 10,
    baseType: "mylarBlanket",
  },
  {
    id: "",
    name: "Oxygen Tank",
    description:
      "When attached to a vaccsuit provides up to 12 hours of oxygen under normal circumstances, 4 hours under stressful circumstances. Explosive.",
    equipped: true,
    quantity: 1,
    cost: 50,
    baseType: "oxygenTank",
  },
  {
    id: "",
    name: "Paracord (50m)",
    description: "General purpose lightweight nylon rope.",
    equipped: true,
    quantity: 1,
    cost: 10,
    baseType: "paracord",
  },
  {
    id: "",
    name: "Patch Kit",
    description:
      "Repairs punctured and torn vaccsuits, restoring their space readiness. Patched vaccsuits have an AP of 1.",
    equipped: true,
    quantity: 3,
    cost: 200,
    baseType: "patchKit",
  },
  {
    id: "",
    name: "Personal Locator",
    description:
      "Allows crewmembers at a control center (or on the bridge of a ship) to track the location of the wearer.",
    equipped: true,
    quantity: 1,
    cost: 45,
    baseType: "personalLocator",
  },
  {
    id: "",
    name: "Pet (Organic)",
    description:
      "Small to medium-sized organic pet animal. Larger or rare pets cost 2d10x.",
    equipped: true,
    quantity: 1,
    cost: 200000,
    baseType: "petOrganic",
  },
  {
    id: "",
    name: "Pet (Synthetic)",
    description:
      "Small to medium-sized synthetic pet animal. Larger or rare pets cost 2d10x.",
    equipped: true,
    quantity: 1,
    cost: 15000,
    baseType: "petSynthetic",
  },
  {
    id: "",
    name: "Pain Pills",
    description:
      "When ingested, immediately restores 1d10 health and lowers Stress by 1. There is a danger of addiction and/or overdose if used frequently.",
    equipped: true,
    quantity: 5,
    cost: 450,
    baseType: "painPills",
  },
  {
    id: "",
    name: "Radiation Pills",
    description:
      "Reduces Radiation Damage (see pg. xx.x) by 2d10 for 2d10 minutes.",
    equipped: true,
    quantity: 5,
    cost: 200,
    baseType: "radiationPills",
  },
  {
    id: "",
    name: "Portable Computer Terminal",
    description:
      "Flat computer monitor, keyboard and interface which allows the user to hack into pre-existing computers and networks, as well as perform standard computer tasks.",
    equipped: true,
    quantity: 1,
    cost: 1500,
    baseType: "portableComputerTerminal",
  },
  {
    id: "",
    name: "Radio Jammer",
    description:
      "Rucksack-sized device which, when activated, renders incomprehensible the radio signals of all within 100km.",
    equipped: true,
    quantity: 1,
    cost: 175,
    baseType: "radioJammer",
  },
  {
    id: "",
    name: "Rebreather",
    description:
      "When worn, filters toxic air and/or allows for underwater breathing for up to twenty minutes at a time without resurfacing. Can be connected to an oxygen tank.",
    equipped: true,
    quantity: 1,
    cost: 45,
    baseType: "rebreather",
  },
  {
    id: "",
    name: "Rucksack",
    description: "Large, durable, waterproof backpack.",
    equipped: true,
    quantity: 1,
    cost: 50,
    baseType: "rucksack",
  },
  {
    id: "",
    name: "Sample Collection Kit",
    description:
      "Used to research xenoflora and xenofauna in the field. Can take vital signs, DNA samples ,and collect other data on foreign material. Results may not be instaneous and may require a lab for complete analysis.",
    equipped: true,
    quantity: 1,
    cost: 250,
    baseType: "sampleKit",
  },
  {
    id: "",
    name: "Smart-link Add-On",
    description:
      "Grants remote viewing, recording, and operation of a ranged weapon as well as +5 DMG.",
    equipped: true,
    quantity: 1,
    cost: 10000,
    baseType: "smartLinkAddOn",
  },
  {
    id: "",
    name: "Stimpak",
    description:
      "Cures cryosickness. Restores 1d10 Health and grants Advantage to Strength and Combat for 2d10 minutes. There is a danger of addiction and/or overdose if used frequently. ",
    equipped: true,
    quantity: 5,
    cost: 600,
    baseType: "stimpak",
  },
  {
    id: "",
    name: "Water Filtration Device",
    description:
      "Can pump 50 liters of filtered water per hour from even the most brackish swamps.",
    equipped: true,
    quantity: 1,
    cost: 15,
    baseType: "waterFiltrationDevice",
  },
];

export const allEquipmentDict: Record<string, Equipment> = toDict(
  allEquipment,
  (e) => e.baseType
);
