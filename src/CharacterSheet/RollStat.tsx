import { analyseStatRoll } from "helpers";
import { Log } from "Messages/types";
import { useState } from "react";
import { allSkillsDict, allStats } from "Rules/data";
import {
  RollMode,
  SkillType,
  StatRoll,
  StatRollResult,
  StatType,
} from "Rules/types";
import { simpleRoll } from "Services/diceServices";
import { Block, Button, Divider } from "UI/Atoms";
import { SelectableRating, Skill } from "UI/Molecules";
import { ReadWriteCharacter, SetMode } from "./types";

interface Props extends ReadWriteCharacter, Log, SetMode {
  onRoll?(): void;
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
  onRoll,
}: Props) {
  const [stat, setStat] = useState<StatType>("combat");
  const [skill, setSkill] = useState<SkillType | null>(null);
  const [rollMode, setRollMode] = useState<RollMode>("normal");

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
            key={s}
            skill={allSkillsDict[s]}
            onClick={() => {
              setSkill((ss) => (ss === s ? null : s));
            }}
            selected={s === skill}
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
            log({
              type: "StatRollMessage",
              props: results,
            });
            const analysis = analyseStatRoll(results);
            if (!analysis.isSuccess) {
              setCharacter(c => ({...c, stress: c.stress + 1}))
            }
            if (onRoll) {
              onRoll();
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
