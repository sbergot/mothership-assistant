import { useState } from "react";
import { allSkillsDict } from "Rules/data";
import { RollMode, SkillType } from "Rules/types";
import { Log } from "Session/types";
import { Block, Button, Divider } from "UI/Atoms";
import { Rating, SelectableRating, Skill } from "UI/Molecules";
import { ReadWriteCharacter, SetMode } from "./types";

interface Props extends ReadWriteCharacter, Log, SetMode {}

type Stat = "strength" | "speed" | "intellect" | "combat";

const allStats: { stat: Stat; title: string }[] = [
  {
    stat: "strength",
    title: "Strength",
  },
  {
    stat: "speed",
    title: "Speed",
  },
  {
    stat: "intellect",
    title: "Intellect",
  },
  {
    stat: "combat",
    title: "Combat",
  },
];

export function RollStat({ character }: Props) {
  const [stat, setStat] = useState<Stat>("combat");
  const [skill, setSkill] = useState<SkillType | null>(null);
  const [mode, setMode] = useState<RollMode>("normal");

  return (
    <Block variant="light">
      <div className="flex justify-center gap-8">
        {allStats.map(({ stat: s, title }) => (
          <SelectableRating
            title={title}
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
          light={mode !== "advantage"}
          rounded
          onClick={() => {
            setMode((m) => (m === "advantage" ? "normal" : "advantage"));
          }}
        >
          advantage
        </Button>
        <Button
          light={mode !== "disadvantage"}
          rounded
          onClick={() => {
            setMode((m) => (m === "disadvantage" ? "normal" : "disadvantage"));
          }}
        >
          disadvantage
        </Button>
      </div>
      <Divider />
      <div className="flex justify-center gap-2">
        <Button dark rounded onClick={() => {}}>
          roll
        </Button>
        <Button rounded onClick={() => {}}>
          back
        </Button>
      </div>
    </Block>
  );
}
