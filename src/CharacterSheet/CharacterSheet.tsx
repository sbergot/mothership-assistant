import { Log } from "Messages/types";
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
import { RollSave } from "./RollSave";
import { RollStat } from "./RollStat";
import { Skills } from "./Skills";
import { PickSkill } from "./Skills/PickSkill";
import { StartTrainingSkill } from "./Skills/StartTrainingSkill";
import { TrainSkill } from "./Skills/TrainSkill";
import { ViewSkill } from "./Skills/ViewSkill";
import { Stats } from "./Stats";
import { Status } from "./Status";
import { Modes, ReadWriteCharacter, SetMode, Wallet } from "./types";
import { ViewArmor } from "./ViewArmor";
import { ViewCondition } from "./ViewCondition";
import { ViewEquipment } from "./ViewEquipment";
import { ViewWeapon } from "./ViewWeapon";
import { Weapons } from "./Weapons";
import { RollPanic } from "./RollPanic";
import { TakeDamage } from "./TakeDamage";
import { updateInList } from "helpers";
import { RollWound } from "./RollWound";
import { ViewBleeding } from "./ViewBleeding";
import { RollRest } from "./RollRest";

export function CharacterSheet({
  character,
  setCharacter,
  log,
  mode,
  setMode,
}: ReadWriteCharacter & Log & SetMode & { mode: Modes }) {
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

  if (mode.mode === "ViewBleeding") {
    return (
      <ViewBleeding
        character={character}
        setCharacter={setCharacter}
        setMode={setMode}
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
        log={log}
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
        wallet={wallet}
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

  if (mode.mode === "RollStat") {
    return (
      <RollStat
        character={character}
        setCharacter={setCharacter}
        log={log}
        setMode={setMode}
      />
    );
  }

  if (mode.mode === "RollAttack") {
    const { weaponId } = mode;

    return (
      <RollStat
        character={character}
        setCharacter={setCharacter}
        log={log}
        setMode={setMode}
        weaponId={weaponId}
      />
    );
  }

  if (mode.mode === "RollSave") {
    return (
      <RollSave
        character={character}
        setCharacter={setCharacter}
        log={log}
        setMode={setMode}
      />
    );
  }

  if (mode.mode === "RollRest") {
    return (
      <RollRest
        character={character}
        setCharacter={setCharacter}
        log={log}
        setMode={setMode}
      />
    );
  }

  if (mode.mode === "PanicCheck") {
    return (
      <RollPanic
        character={character}
        setCharacter={setCharacter}
        log={log}
        setMode={setMode}
      />
    );
  }

  if (mode.mode === "TakeDamage") {
    return (
      <TakeDamage setCharacter={setCharacter} log={log} setMode={setMode} />
    );
  }

  if (mode.mode === "RollWound") {
    return (
      <RollWound
        character={character}
        setCharacter={setCharacter}
        log={log}
        setMode={setMode}
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
