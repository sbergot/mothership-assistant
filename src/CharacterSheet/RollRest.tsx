import { analyseRoll } from "helpers";
import { Log } from "Messages/types";
import { useState } from "react";
import { allSaves } from "Rules/data";
import { RollMode, Roll, RollResult, SaveType } from "Rules/types";
import { simpleRoll } from "Services/diceServices";
import { Block, Button, Divider } from "UI/Atoms";
import { SelectableRating } from "UI/Molecules";
import { ReadWriteCharacter, SetMode } from "./types";

interface Props extends ReadWriteCharacter, Log, SetMode {}

function rollSave(roll: Roll): RollResult {
  const result =
    roll.rollMode === "normal"
      ? [simpleRoll(100)]
      : [simpleRoll(100), simpleRoll(100)];
  return { ...roll, result };
}

export function RollRest({ character, setCharacter, log, setMode }: Props) {
  let save: SaveType = "body";
  allSaves.forEach((s) => {
    if (character[s] < character[save]) {
      save = s;
    }
  });
  const [rollMode, setRollMode] = useState<RollMode>("normal");

  return (
    <Block variant="light">
      <div className="flex justify-center gap-8">
        {allSaves.map((s) => (
          <SelectableRating
            key={s}
            title={s}
            value={character[s]}
            onClick={() => {}}
            selected={s === save}
          />
        ))}
      </div>
      <Divider />
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
            const results = rollSave({
	      save: { value: character[save], name: save },
	      skill: null,
              rollMode,
            });
            log({
              type: "RestRollMessage",
              props: results,
            });
            const analysis = analyseRoll(results);
            if (analysis.isSuccess) {
              setCharacter((c) => ({
                ...c,
                stress: Math.max(
                  c.minStress,
                  c.stress - (analysis.rollValue % 10)
                ),
              }));
            } else {
              setCharacter((c) => ({ ...c, stress: c.stress + 1 }));
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
