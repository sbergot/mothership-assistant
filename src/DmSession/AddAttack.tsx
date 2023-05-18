import { Log } from "Messages/types";
import { InflictedDamageType, RollMode, WoundType } from "Rules/types";
import { applyRollMode, roll } from "Services/diceServices";
import { Block, Button, Divider } from "UI/Atoms";
import { useState } from "react";
import { allWoundTables } from "Rules/Data/wounds";
import { woundTypeToCriticalType } from "Services/damageServices";

const allDiceTypes = [5, 10, 20, 100];

interface Props extends Log {
  monsterId: string;
}

export function AddAttack({ log }: Props) {
  const [rollMode, setRollMode] = useState<RollMode>("normal");
  const [diceType, setDiceType] = useState<number>(5);
  const [diceNbr, setDiceNbr] = useState<number>(1);
  const [woundType, setWoundType] = useState<WoundType>("bleeding");
  const [inflictedType, setInflictedType] =
    useState<InflictedDamageType>("health");

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
              d{n}
            </Button>
          ))}
        </div>
        <div className="self-center">
          <span className="mr-4">Dice #</span>
          <input
            type="number"
            className="input w-10"
            value={diceNbr}
            onChange={(e) => setDiceNbr(parseInt(e.target.value))}
          />
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
        <div className="self-center mt-4">
          <span className="mr-2">Deal damage</span>
          <input
            type="checkbox"
            defaultChecked={dealDamage}
            onChange={(e) => setDealDamage(e.target.checked)}
          />
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {allWoundTables.map((wt) => (
            <Button
              light={woundType !== wt.woundType}
              rounded
              disabled={!dealDamage}
              onClick={() => {
                setWoundType(wt.woundType);
              }}
            >
              {wt.name}
            </Button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          <Button
            light={inflictedType !== "health"}
            rounded
            disabled={!dealDamage}
            onClick={() => {
              setInflictedType("health");
            }}
          >
            health
          </Button>
          <Button
            light={inflictedType !== "wounds"}
            rounded
            disabled={!dealDamage}
            onClick={() => {
              setInflictedType("wounds");
            }}
          >
            wounds
          </Button>
        </div>
        <Divider />
        <div className="flex justify-center gap-2">
          <Button dark rounded onClick={rollDices}>
            roll
          </Button>
        </div>
      </div>
    </Block>
  );
}
