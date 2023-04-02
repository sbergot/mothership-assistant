import { analysePanicRoll, applyPanic } from "helpers";
import { Log } from "Messages/types";
import { useState } from "react";
import { PanicRoll, PanicRollResult, RollMode } from "Rules/types";
import { simpleRoll } from "Services/diceServices";
import { Block, Button, Divider } from "UI/Atoms";
import { ReadWriteCharacter, SetMode } from "./types";

interface Props extends ReadWriteCharacter, Log, SetMode {}

function rollPanic(roll: PanicRoll): PanicRollResult {
  const result =
    roll.rollMode === "normal"
      ? [simpleRoll(20)]
      : [simpleRoll(20), simpleRoll(20)];
  return { ...roll, result };
}

export function RollPanic({ character, setCharacter, log, setMode }: Props) {
  const [rollMode, setRollMode] = useState<RollMode>("normal");

  return (
    <Block variant="light">
      <div className="flex justify-center gap-2">
        <Button
          light={rollMode !== "advantage"}
          rounded
          onClick={() => {
            setRollMode((m) => (m === "advantage" ? "normal" : "advantage"));
          }}
        >
          advantage
        </Button>
        <Button
          light={rollMode !== "disadvantage"}
          rounded
          onClick={() => {
            setRollMode((m) =>
              m === "disadvantage" ? "normal" : "disadvantage"
            );
          }}
        >
          disadvantage
        </Button>
      </div>
      <Divider />
      <div className="flex justify-center gap-2">
        <Button
          dark
          rounded
          onClick={() => {
            const results = rollPanic({
              stress: character.stress,
              rollMode,
            });
            log({
              type: "PanicRollMessage",
              props: results,
            });
            const analysis = analysePanicRoll(results);
            if (!analysis.isSuccess) {
              setCharacter(c => applyPanic(c, log, analysis.rollValue));
            }
            setMode({ mode: "CharacterSheet" });
          }}
        >
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
