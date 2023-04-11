import { NormalizedCriticalType, WoundType } from "Rules/types";
import { Block, Button, Divider } from "UI/Atoms";
import { analysePanicRoll, applyPanic } from "helpers";
import { useState } from "react";
import { SetMode, WriteCharacter } from "./types";
import { Log } from "Messages/types";
import { allWoundTables } from "Rules/Data/wounds";

const allWoundTypes: WoundType[] = [
  "bleeding",
  "blunt",
  "fire",
  "gore",
  "gunshot",
];

interface Props extends WriteCharacter, SetMode, Log {}

export function RollWound({ setCharacter, setMode, log }: Props) {
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
                  ...woundRoll,
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
        <Button dark rounded onClick={() => {}}>
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
