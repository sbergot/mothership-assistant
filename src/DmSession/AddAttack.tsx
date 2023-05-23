import { Damage, DamageType, RollMode, WoundType, Monster } from "Rules/types";
import { Block, Button, Divider } from "UI/Atoms";
import { useEffect, useState } from "react";
import { allWoundTables } from "Rules/Data/wounds";
import { ReadWriteGame, SetDmMode } from "./types";
import { updateInList } from "helpers";
import { uuidv4 } from "Services/storageServices";
import {
  getDamageDescription,
  getRollModeSuffix,
} from "Services/damageServices";

const allDiceTypes: DamageType[] = [
  "xd5",
  "xd10",
  "xd20",
  "d100",
  "fixedDamage",
  "fixedWounds",
];

interface Props extends ReadWriteGame, SetDmMode {
  monsterId: string;
  attackId?: string;
}

export function AddAttack({
  game,
  setGame,
  monsterId,
  setMode,
  attackId,
}: Props) {
  const [attackName, setAttackName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [rollMode, setRollMode] = useState<RollMode>("normal");
  const [diceType, setDiceType] = useState<DamageType>("xd5");
  const [diceNbr, setDiceNbr] = useState<number>(1);
  const [woundType, setWoundType] = useState<WoundType>("bleeding");

  useEffect(() => {
    if (attackId === undefined) {
      return;
    }
    const monster = game.monsters.find((m) => m.id === monsterId);
    if (monster === undefined) {
      return;
    }
    const attack = monster.attacks.find((a) => a.id === attackId);
    if (attack === undefined) {
      return;
    }
    setAttackName(attack.name);
    setDescription(attack.description);
    setRollMode(attack.damage.rollMode);
    setDiceType(attack.damage.damageType);
    setDiceNbr(attack.damage.amount);
    setWoundType(attack.critical.woundType);
  }, [attackId]);

  function back() {
    setMode({ mode: "ListAttacks", monsterId });
  }

  function getDamageTypeDescr(dmType: DamageType): string {
    switch (dmType) {
      case "fixedDamage":
        return "fixed";
      case "xd5":
        return "d5";
      case "xd10":
        return "d10";
      case "xd20":
        return "d20";
      case "d100":
        return "d100";
      case "fixedWounds":
        return "fixed wounds";
      default:
        throw new Error("Unknown dice type");
    }
  }

  function getDamage(): Damage {
    return {
      amount: diceNbr,
      rollMode,
      damageType: diceType,
    };
  }

  function updateMonster(setter: (m: Monster) => Monster) {
    setGame((g) => ({
      ...g,
      monsters: updateInList(g.monsters, monsterId, setter),
    }));
  }

  function addAttack() {
    updateMonster((m) => ({
      ...m,
      attacks: [
        ...m.attacks,
        {
          critical: { rollMode: "normal", woundType },
          damage: getDamage(),
          description,
          name: attackName,
          id: uuidv4(),
        },
      ],
    }));
    back();
  }

  function updateAttack() {
    updateMonster((m) => ({
      ...m,
      attacks: updateInList(m.attacks, attackId!, (a) => ({
        ...a,
        critical: { rollMode: "normal", woundType },
        damage: getDamage(),
        description,
        name: attackName,
      })),
    }));
    back();
  }

  return (
    <Block variant="light">
      <div className="flex flex-col gap-4">
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
        <div>
          <div className="text-center">Damage type</div>
          <div className="flex justify-center gap-2">
            {allDiceTypes.map((n) => (
              <Button
                light={diceType !== n}
                rounded
                onClick={() => {
                  setDiceType(n);
                }}
              >
                {getDamageTypeDescr(n)}
              </Button>
            ))}
          </div>
        </div>
        <div className="self-center">
          <span className="mr-4">#</span>
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
        <div className="text-center">
          {getDamageDescription(getDamage())}
          {getRollModeSuffix(rollMode)}
        </div>
        <Divider />
        <div className="flex justify-center gap-2">
          <Button
            dark
            rounded
            onClick={attackId === undefined ? addAttack : updateAttack}
          >
            {attackId === undefined ? "add" : "update"}
          </Button>
          <Button rounded onClick={back}>
            back
          </Button>
        </div>
      </div>
    </Block>
  );
}
