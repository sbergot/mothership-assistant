import { useState } from "react";
import { Block, Button2, Divider, Title } from "../Atoms";
import { patches, trinkets } from "../Data/data";
import { BlockWithTitle, SelectableBlockWithTitle } from "../Molecules";
import { pickRandom } from "../Services/diceServices";
import { StepProps } from "./types";

export function RollEquipment({ character, onConfirm }: StepProps) {
  const [newCharacter, setCharacter] = useState({ ...character });
  const [trinketRolled, setTrinketRolled] = useState(false);
  const [patchRolled, setPatchRolled] = useState(false);
  const [gearOptionRolled, setGearOptionRolled] = useState(false);
  const [gearOption, setGearOption] = useState<"loadout" | "credits" | null>(
    null
  );
  const done = trinketRolled && patchRolled && gearOptionRolled;

  function rollTrinket() {
    setCharacter((c) => ({ ...c, trinket: pickRandom(trinkets) }));
    setTrinketRolled(true);
  }

  function rollPatch() {
    setCharacter((c) => ({ ...c, patch: pickRandom(patches) }));
    setPatchRolled(true);
  }

  function rollGearOption() {
    if (gearOption === "") {
      
    }
  }

  return (
    <div className="flex flex-col">
      <Block variant="light">
        <Title>8. Roll for your equipment trinket, patch & loadout </Title>
        <div className="flex flex-col gap-2">
          <BlockWithTitle title="Trinket">
            <div className="mx-auto">{newCharacter.trinket || "-"}</div>
          </BlockWithTitle>
          <div className="self-center">
            <Button2 disabled={trinketRolled} onClick={rollTrinket}>
              Roll
            </Button2>
          </div>
          <BlockWithTitle title="Patch">
            <div className="mx-auto">{newCharacter.patch || "-"}</div>
          </BlockWithTitle>
          <div className="self-center">
            <Button2 disabled={patchRolled} onClick={rollPatch}>
              Roll
            </Button2>
          </div>
          <SelectableBlockWithTitle
            selected={gearOption === "loadout"}
            onClick={() => setGearOption("loadout")}
            title="Random loadout"
          >
            <div className="mx-auto">-</div>
          </SelectableBlockWithTitle>
          <Divider />
          <SelectableBlockWithTitle
            selected={gearOption === "credits"}
            onClick={() => setGearOption("credits")}
            title="Starting credits"
          >
            <div className="mx-auto">-</div>
          </SelectableBlockWithTitle>
          <div className="self-center">
            <Button2 disabled={gearOptionRolled} onClick={rollGearOption}>
              Roll
            </Button2>
          </div>
        </div>
      </Block>
      <div className="self-center">
        <Button2 disabled={!done} onClick={() => onConfirm(newCharacter)}>
          Confirm
        </Button2>
      </div>
    </div>
  );
}
