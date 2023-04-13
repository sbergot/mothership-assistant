import { NormalizedCriticalType, WoundType } from "Rules/types";
import { Block, Button, Divider } from "UI/Atoms";
import { useState } from "react";
import { ReadWriteCharacter, SetMode, WriteCharacter } from "./types";
import { Log } from "Messages/types";
import { allWoundTables } from "Rules/Data/wounds";
import { rollWound } from "Services/damageServices";

interface Props extends ReadWriteCharacter, SetMode, Log {}

export function RollWound({ character, setCharacter, setMode, log }: Props) {
  const [woundRoll, setWoundRoll] = useState<NormalizedCriticalType>({
    rollMode: "normal",
    woundType: "bleeding",
  });

  const { rollMode, woundType } = woundRoll;

  return (
    <Block variant="light">
      <div className="flex justify-center gap-2">
        <Button
          light={rollMode !== "advantage"}
          rounded
          onClick={() => {
            setWoundRoll((m) => ({
              ...m,
              rollMode: m.rollMode === "advantage" ? "normal" : "advantage",
            }));
          }}
        >
          advantage
        </Button>
        <Button
          light={rollMode !== "disadvantage"}
          rounded
          onClick={() => {
            setWoundRoll((m) => ({
              ...m,
              rollMode:
                m.rollMode === "disadvantage" ? "normal" : "disadvantage",
            }));
          }}
        >
          disadvantage
        </Button>
      </div>
      <Divider />
      <div className="flex flex-wrap justify-center gap-2">
        {allWoundTables.map((wt) => (
          <div className="shrink-0">
            <Button
              light={woundType != wt.woundType}
              rounded
              onClick={() => {
                setWoundRoll((wr) => ({
                  ...wr,
                  woundType: wt.woundType,
                }));
              }}
            >
              {wt.name}
            </Button>
          </div>
        ))}
      </div>
      <Divider />
      <div className="flex justify-center gap-2">
        <Button dark rounded onClick={() => {
          // we don't use setter function because we have side effects and it is run twice
          const newChar = rollWound(character, log, [woundRoll]);
          setCharacter(c => newChar);
          setMode({ mode: "CharacterSheet" });
        }}>
          roll
        </Button>
        <Button
          rounded
          onClick={() => {
            setMode({ mode: "CharacterSheet" });
          }}
        >
          back
        </Button>
      </div>
    </Block>
  );
}
