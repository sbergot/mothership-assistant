import { useState } from "react";
import { allSkillsDict } from "Rules/data";
import { Log } from "Session/types";
import { Block, Button, Divider } from "UI/Atoms";
import { Rating, Skill } from "UI/Molecules";
import { ReadWriteCharacter, SetMode } from "./types";

interface Props extends ReadWriteCharacter, Log, SetMode {}

type Stat = "strength" | "speed" | "intellect" | "combat";

export function RollStat({ character }: Props) {
  const [stat, setStat] = useState<Stat>("combat");
  return (
    <Block variant="light">
      <div className="flex justify-center gap-8">
        <Rating title="Strength" value={character.strength} />
        <Rating title="Speed" value={character.speed} />
        <Rating title="Intellect" value={character.intellect} />
        <Rating title="Combat" value={character.combat} />
      </div>
      <Divider />
      <div className="flex flex-wrap justify-center items-center gap-4">
        {character.skills.map((s) => (
          <Skill key={s} skill={allSkillsDict[s]} onClick={() => {}} />
        ))}
      </div>
      <Divider />
      <div className="flex justify-center gap-2">
        <Button light rounded onClick={() => {}}>advantage</Button>
        <Button light rounded onClick={() => {}}>disadvantage</Button>
      </div>
      <Divider />
      <div className="flex justify-center gap-2">
        <Button dark rounded onClick={() => {}}>roll</Button>
        <Button rounded onClick={() => {}}>back</Button>
      </div>
    </Block>
  );
}
