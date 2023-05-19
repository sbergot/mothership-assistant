import {
  Damage,
  DamageType,
  InflictedDamageType,
  RollMode,
  WoundType,
} from "Rules/types";
import { Block, Button, Divider } from "UI/Atoms";
import { useState } from "react";
import { allWoundTables } from "Rules/Data/wounds";
import { ReadWriteGame, SetDmMode } from "./types";
import { updateInList } from "helpers";

const allDiceTypes = [5, 10, 20, 100];

interface Props extends ReadWriteGame, SetDmMode {
  monsterId: string;
}

export function AddAttack({ game, setGame, monsterId, setMode }: Props) {
  const [attackName, setAttackName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [rollMode, setRollMode] = useState<RollMode>("normal");
  const [diceType, setDiceType] = useState<number>(5);
  const [diceNbr, setDiceNbr] = useState<number>(1);
  const [woundType, setWoundType] = useState<WoundType>("bleeding");
  const [inflictedType, setInflictedType] =
    useState<InflictedDamageType>("health");

  function back() {
    setMode({ mode: "DmSheet" });
  }
  function getDamageType(): DamageType {
    switch (diceType) {
      case 5:
        return "xd5";
      case 10:
        return "xd10";
      case 20:
        return "xd20";
      case 100:
        return "d100";
      default:
        throw new Error("Unknown dice type");
    }
  }

  function getDamage(): Damage {
    return {
      amount: diceNbr,
      rollMode,
      damageType: getDamageType(),
    };
  }

  function addAttack() {
    setGame((g) => ({
      ...g,
      monsters: updateInList(g.monsters, monsterId, (m) => ({
        ...m,
        attacks: [
          ...m.attacks,
          {
            critical: { rollMode: "normal", woundType },
            damage: getDamage(),
            description,
            name: attackName,
          },
        ],
      })),
    }));
    back();
  }

  return (
    <Block variant="light">
      <div className="flex flex-col gap-2">
        <Block variant="dark">
          <div>
            <label>Attack name</label>
            <input
              className="input"
              value={attackName}
              onChange={(e) => setAttackName(e.target.value)}
            />
          </div>
          <div>
            <label>Description</label>
            <textarea
              className="input resize-none h-32"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </Block>
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
        <div className="flex flex-wrap gap-2 justify-center">
          {allWoundTables.map((wt) => (
            <Button
              light={woundType !== wt.woundType}
              rounded
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
            onClick={() => {
              setInflictedType("health");
            }}
          >
            health
          </Button>
          <Button
            light={inflictedType !== "wounds"}
            rounded
            onClick={() => {
              setInflictedType("wounds");
            }}
          >
            wounds
          </Button>
        </div>
        <Divider />
        <div className="flex justify-center gap-2">
          <Button dark rounded onClick={addAttack}>
            add
          </Button>
          <Button rounded onClick={back}>
            back
          </Button>
        </div>
      </div>
    </Block>
  );
}
