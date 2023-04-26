import { Log } from "Messages/types";
import { RollMode, WoundType } from "Rules/types";
import { applyRollMode, roll } from "Services/diceServices";
import { Block, Button, Divider } from "UI/Atoms";
import { useState } from "react";
import { SetDmMode } from "./types";
import { Rating } from "UI/Molecules";

const allDiceTypes = [5, 10, 20, 100];

export function Roll({ log, setMode }: Log & SetDmMode) {
  const [rollMode, setRollMode] = useState<RollMode>("normal");
  const [diceType, setDiceType] = useState<number>(5);
  const [diceNbr, setDiceNbr] = useState<number>(1);
  const [dealDamage, setDealDamage] = useState(false);
  const [woundType, setWoundType] = useState<WoundType>("bleeding");

  function rollDices() {
    const result = applyRollMode(rollMode, () => roll(diceNbr, diceType));
    log({
      type: "GenericRollMessage",
      props: { diceNbr, diceType, rollMode, result },
    });
  }

  return (
    <Block variant="light">
      <div className="flex flex-col gap-2">
        <div className="flex justify-center gap-2">
          {allDiceTypes.map((n) => (
            <Button
              light={diceType !== n}
              rounded
              onClick={() => {
                setDiceType(n);
              }}
            >
              {n}
            </Button>
          ))}
        </div>
        <div>
          <Rating title="dice #" value={diceNbr} onUpdate={(v) => setDiceNbr(v)} />
        </div>
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
          <Button dark rounded onClick={rollDices}>
            roll
          </Button>
          <Button
            rounded
            onClick={() => {
              setMode({ mode: "DmSheet" });
            }}
          >
            back
          </Button>
        </div>
      </div>
    </Block>
  );
}
