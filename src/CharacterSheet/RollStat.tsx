import { analyseStatRoll, updateInList } from "helpers";
import { Log } from "Messages/types";
import { useState } from "react";
import { allStats } from "Rules/data";
import {
  CharacterSkill,
  RollMode,
  StatRoll,
  StatRollResult,
  StatType,
} from "Rules/types";
import { simpleRoll } from "Services/diceServices";
import { Block, Button, Divider } from "UI/Atoms";
import { SelectableRating, Skill } from "UI/Molecules";
import { ReadWriteCharacter, SetMode } from "./types";
import { allSkillsDict } from "Rules/Data/skills";

interface Props extends ReadWriteCharacter, Log, SetMode {
  weaponId?: string;
}

function rollStat(roll: StatRoll): StatRollResult {
  const result =
    roll.rollMode === "normal"
      ? [simpleRoll(100)]
      : [simpleRoll(100), simpleRoll(100)];
  return { ...roll, result };
}

export function RollStat({
  character,
  setCharacter,
  log,
  setMode,
  weaponId,
}: Props) {
  const [stat, setStat] = useState<StatType>("combat");
  const [skill, setSkill] = useState<CharacterSkill | null>(null);
  const [rollMode, setRollMode] = useState<RollMode>("normal");

  function spendAmmo() {
    if (weaponId === undefined) {
      return;
    }
    setCharacter((c) => ({
      ...c,
      weapons: updateInList(c.weapons, weaponId, (w) => {
        if (w.shots == null) {
          return w;
        }
        if (w.shots > 1) {
          return {
            ...w,
            shots: w.shots - 1,
          };
        }
        if (w.shots === 1 && w.magazines! > 0) {
          return {
            ...w,
            shots: w.magazineSize,
            magazines: w.magazines! - 1
          };
        }
        return {
          ...w,
          shots: 0,
        };
      }),
    }));
  }

  return (
    <Block variant="light">
      <div className="flex justify-center gap-8">
        {allStats.map((s) => (
          <SelectableRating
            key={s}
            title={s}
            value={character[s]}
            onClick={() => setStat(s)}
            selected={s === stat}
          />
        ))}
      </div>
      <Divider />
      <div className="flex flex-wrap justify-center items-center gap-4">
        {character.skills.map((s) => (
          <Skill
            key={s.type}
            skill={allSkillsDict[s.type]}
            onClick={() => {
              setSkill((ss) => (ss?.type === s.type ? null : s));
            }}
            selected={s.type === skill?.type}
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
            const results = rollStat({
              stat: { value: character[stat], name: stat },
              skill,
              rollMode,
            });
            log(
              weaponId === undefined
                ? {
                    type: "StatRollMessage",
                    props: results,
                  }
                : {
                    type: "AttackRollMessage",
                    props: { weaponId, roll: results },
                  }
            );
            const analysis = analyseStatRoll(results);
            if (!analysis.isSuccess) {
              setCharacter((c) => ({ ...c, stress: c.stress + 1 }));
            }
            spendAmmo();
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
