import { AddArmor } from "CharacterSheet/AddArmor";
import { AddCustomItem } from "CharacterSheet/AddCustomItem";
import { AddEquipment } from "CharacterSheet/AddEquipment";
import { AddWeapon } from "CharacterSheet/AddWeapon";
import { Armor } from "CharacterSheet/Armor";
import { Equipment } from "CharacterSheet/Equipment";
import { Modes, SetMode, Wallet, WriteCharacter } from "CharacterSheet/types";
import { ViewArmor } from "CharacterSheet/ViewArmor";
import { ViewEquipment } from "CharacterSheet/ViewEquipment";
import { ViewWeapon } from "CharacterSheet/ViewWeapon";
import { Weapons } from "CharacterSheet/Weapons";
import { useState } from "react";
import { BaseCharacter, Contractor } from "Rules/types";
import { Button } from "UI/Atoms";
import { ContractorIdentity } from "./ContractorIdentity";
import { ContractorStats } from "./ContractorStats";
import { ContractorStatus } from "./ContractorStatus";

interface Props extends WriteCharacter {
  contractor: Contractor;
  wallet: Wallet;
  back(): void;
}

export function ContractorSheet({
  contractor,
  setCharacter,
  back,
  wallet,
}: Props) {
  const [mode, setMode] = useState<Modes>({ mode: "CharacterSheet" });

  function setContractor(setter: (c: Contractor) => Contractor) {
    setCharacter((char) => {
      return {
        ...char,
        contractors: char.contractors.map((c) => {
          if (c.id !== contractor.id) {
            return c;
          }
          return setter(c);
        }),
      };
    });
  }

  if (mode.mode === "AddWeapon") {
    return (
      <AddWeapon
        setCharacter={setContractor}
        setMode={setMode}
        wallet={wallet}
      />
    );
  }

  if (mode.mode === "ViewWeapon") {
    return (
      <ViewWeapon
        setCharacter={setContractor}
        setMode={setMode}
        weapon={mode.weapon}
      />
    );
  }

  if (mode.mode === "AddArmor") {
    return (
      <AddArmor
        setCharacter={setContractor}
        setMode={setMode}
        wallet={wallet}
      />
    );
  }

  if (mode.mode === "ViewArmor") {
    return (
      <ViewArmor
        setCharacter={setContractor}
        setMode={setMode}
        armor={mode.armor}
      />
    );
  }

  if (mode.mode === "AddEquipment") {
    return (
      <AddEquipment
        setCharacter={setContractor}
        setMode={setMode}
        wallet={wallet}
      />
    );
  }

  if (mode.mode === "AddCustomItem") {
    return <AddCustomItem setCharacter={setContractor} setMode={setMode} />;
  }

  if (mode.mode === "ViewEquipment") {
    return (
      <ViewEquipment
        setCharacter={setCharacter}
        setMode={setMode}
        equipment={mode.equipment}
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <ContractorIdentity
        contractor={contractor}
        setContractor={setContractor}
      />
      <ContractorStatus
        contractor={contractor}
        setContractor={setContractor}
        setMode={setMode}
      />
      <ContractorStats contractor={contractor} />
      <Weapons character={contractor} setMode={setMode} />
      <Armor character={contractor} setMode={setMode} />
      <Equipment character={contractor} setMode={setMode} />
      <Button onClick={back}>Back</Button>
    </div>
  );
}
