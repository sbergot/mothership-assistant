import { useState } from "react";
import { AddArmor } from "./AddArmor";
import { AddCondition } from "./AddCondition";
import { AddContractor } from "./AddContractor";
import { AddCustomItem } from "./AddCustomItem";
import { AddEquipment } from "./AddEquipment";
import { AddWeapon } from "./AddWeapon";
import { Armor } from "./Armor";
import { Contractors } from "./Contractors";
import { ContractorSheet } from "./Contractors/ContractorSheet";
import { EditStats } from "./EditStats";
import { Equipment } from "./Equipment";
import { Identity } from "./Identity";
import { Skills } from "./Skills";
import { PickSkill } from "./Skills/PickSkill";
import { StartTrainingSkill } from "./Skills/StartTrainingSkill";
import { TrainSkill } from "./Skills/TrainSkill";
import { ViewSkill } from "./Skills/ViewSkill";
import { Stats } from "./Stats";
import { Status } from "./Status";
import { Modes, ReadWriteCharacter, Wallet } from "./types";
import { ViewArmor } from "./ViewArmor";
import { ViewCondition } from "./ViewCondition";
import { ViewEquipment } from "./ViewEquipment";
import { ViewWeapon } from "./ViewWeapon";
import { Weapons } from "./Weapons";

export function CharacterSheet({
  character,
  setCharacter,
}: ReadWriteCharacter) {
  const [mode, setMode] = useState<Modes>({ mode: "CharacterSheet" });
  function back() {
    setMode({ mode: "CharacterSheet" });
  }
  const wallet: Wallet = {
    credits: character.credits,
    pay(amout) {
      setCharacter((char) => ({ ...char, credits: char.credits - amout }));
    },
  };

  if (mode.mode === "AddCondition") {
    return (
      <AddCondition
        character={character}
        setCharacter={setCharacter}
        setMode={setMode}
      />
    );
  }

  if (mode.mode === "ViewCondition") {
    return (
      <ViewCondition
        character={character}
        setCharacter={setCharacter}
        setMode={setMode}
        condition={mode.condition}
      />
    );
  }

  if (mode.mode === "SelectSkill") {
    return <PickSkill character={character} setMode={setMode} />;
  }

  if (mode.mode === "StartTrainingSkill") {
    return (
      <StartTrainingSkill
        character={character}
        setCharacter={setCharacter}
        setMode={setMode}
        skill={mode.skill}
      />
    );
  }

  if (mode.mode === "TrainSkill") {
    return (
      <TrainSkill
        character={character}
        setCharacter={setCharacter}
        setMode={setMode}
      />
    );
  }

  if (mode.mode === "ViewSkill") {
    return (
      <ViewSkill
        setCharacter={setCharacter}
        setMode={setMode}
        skill={mode.skill}
      />
    );
  }

  if (mode.mode === "AddWeapon") {
    return (
      <AddWeapon
        setCharacter={setCharacter}
        setMode={setMode}
        wallet={wallet}
      />
    );
  }

  if (mode.mode === "AddArmor") {
    return (
      <AddArmor setCharacter={setCharacter} setMode={setMode} wallet={wallet} />
    );
  }

  if (mode.mode === "AddEquipment") {
    return (
      <AddEquipment
        setCharacter={setCharacter}
        setMode={setMode}
        wallet={wallet}
      />
    );
  }

  if (mode.mode === "ViewContractor") {
    return (
      <ContractorSheet
        setCharacter={setCharacter}
        back={back}
        wallet={wallet}
        contractor={
          character.contractors.find((c) => c.id === mode.contractorId)!
        }
      />
    );
  }

  if (mode.mode === "AddCustomItem") {
    return <AddCustomItem setCharacter={setCharacter} setMode={setMode} />;
  }

  if (mode.mode === "AddContractor") {
    return (
      <AddContractor
        character={character}
        setCharacter={setCharacter}
        setMode={setMode}
      />
    );
  }

  if (mode.mode === "ViewWeapon") {
    return (
      <ViewWeapon
        setCharacter={setCharacter}
        setMode={setMode}
        weapon={character.weapons.find((c) => c.id === mode.weaponId)!}
      />
    );
  }

  if (mode.mode === "ViewArmor") {
    return (
      <ViewArmor
        setCharacter={setCharacter}
        setMode={setMode}
        armor={character.armor.find((c) => c.id === mode.armorId)!}
      />
    );
  }

  if (mode.mode === "ViewEquipment") {
    return (
      <ViewEquipment
        setCharacter={setCharacter}
        setMode={setMode}
        equipment={character.equipment.find((c) => c.id === mode.equipmentId)!}
      />
    );
  }

  if (mode.mode === "EditStats") {
    return (
      <EditStats
        character={character}
        setCharacter={setCharacter}
        back={back}
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Identity character={character} setCharacter={setCharacter} />
      <Status
        character={character}
        setCharacter={setCharacter}
        setMode={setMode}
      />
      <Stats character={character} setMode={setMode} />
      <Skills character={character} setMode={setMode} />
      <Weapons character={character} setMode={setMode} />
      <Armor character={character} setMode={setMode} />
      <Equipment character={character} setMode={setMode} />
      <Contractors character={character} setMode={setMode} />
    </div>
  );
}
