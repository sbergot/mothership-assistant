import { useState } from "react";
import { Block, Button, DividerOr, Tag, Title } from "UI/Atoms";
import { patches, trinkets } from "Rules/data";
import { BlockWithTitle, SelectableBlockWithTitle } from "UI/Molecules";
import { pickRandom, roll } from "Services/diceServices";
import { StepProps } from "./types";
import { clone, formatCredits } from "helpers";
import { instantiateLoadout, loadoutRefs } from "Rules/Data/loadouts";

export function RollEquipment({ character, onConfirm }: StepProps) {
  const [newCharacter, setCharacter] = useState({ ...character });
  const [gearOption, setGearOption] = useState<"loadout" | "credits" | null>(
    null
  );
  const trinketRolled = !!newCharacter.trinket;
  const patchRolled = !!newCharacter.patch;
  const gearOptionRolled = !!newCharacter.credits;
  const done = trinketRolled && patchRolled && gearOptionRolled;

  function rollTrinket() {
    setCharacter((c) => ({ ...c, trinket: pickRandom(trinkets) }));
  }

  function rollPatch() {
    setCharacter((c) => ({ ...c, patch: pickRandom(patches) }));
  }

  function rollGearOption() {
    if (gearOption === "loadout") {
      const loadout = instantiateLoadout(
        pickRandom(loadoutRefs[newCharacter.characterClass])
      );
      setCharacter((c) => ({
        ...c,
        weapons: loadout.weapons.map(clone),
        armor: loadout.armors.map(clone),
        equipment: loadout.equipments.map(clone),
        credits: roll(2, 10) * 10,
      }));
    }

    if (gearOption === "credits") {
      setCharacter((c) => ({
        ...c,
        credits: roll(2, 10) * 100,
      }));
    }
  }

  return (
    <div className="flex flex-col">
      <Block variant="light">
        <Title>8. Roll for your equipment trinket, patch & loadout </Title>
        <div className="flex flex-col items-center gap-2">
          <div className="max-w-sm w-full">
            <BlockWithTitle title="Trinket">
              <div className="mx-auto">{newCharacter.trinket || "-"}</div>
            </BlockWithTitle>
          </div>
          <div className="mb-6">
            <Button rounded dark disabled={trinketRolled} onClick={rollTrinket}>
              Roll
            </Button>
          </div>
          <div className="max-w-sm w-full">
            <BlockWithTitle title="Patch">
              <div className="mx-auto">{newCharacter.patch || "-"}</div>
            </BlockWithTitle>
          </div>
          <div className="mb-6">
            <Button rounded dark disabled={patchRolled} onClick={rollPatch}>
              Roll
            </Button>
          </div>
          {(!gearOptionRolled || gearOption === "loadout") && (
            <div className="w-full">
              <SelectableBlockWithTitle
                selected={gearOption === "loadout"}
                onClick={() => setGearOption("loadout")}
                title="Random loadout"
              >
                <div className="mx-auto">
                  {gearOptionRolled ? (
                    <div className="flex flex-wrap gap-1">
                      {newCharacter.armor.map((a) => (
                        <Tag key={a.id} variant="dark">
                          {a.name}
                        </Tag>
                      ))}
                      {newCharacter.weapons.map((a) => (
                        <Tag key={a.id} variant="dark">
                          {a.weaponType}
                          {a.name !== "" ? ` - ${a.name}` : ""}
                        </Tag>
                      ))}
                      {newCharacter.equipment.map((a) => (
                        <Tag key={a.id} variant="dark">
                          {a.name}
                        </Tag>
                      ))}
                      <Tag variant="dark">{newCharacter.credits}cr</Tag>
                    </div>
                  ) : (
                    "-"
                  )}
                </div>
              </SelectableBlockWithTitle>
            </div>
          )}
          {!gearOptionRolled && <DividerOr />}
          {(!gearOptionRolled || gearOption === "credits") && (
            <div className="w-full">
              <SelectableBlockWithTitle
                selected={gearOption === "credits"}
                onClick={() => setGearOption("credits")}
                title="Starting credits"
              >
                <div className="mx-auto">
                  {gearOptionRolled ? (
                    <Tag variant="dark">
                      {formatCredits(newCharacter.credits)}cr
                    </Tag>
                  ) : (
                    "-"
                  )}
                </div>
              </SelectableBlockWithTitle>
            </div>
          )}
          <div className="self-center">
            <Button
              rounded
              dark
              disabled={gearOptionRolled || gearOption === null}
              onClick={rollGearOption}
            >
              Roll
            </Button>
          </div>
        </div>
      </Block>
      <div className="self-center mt-2">
        <Button
          rounded
          dark
          disabled={!done}
          onClick={() => onConfirm(newCharacter)}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
}
