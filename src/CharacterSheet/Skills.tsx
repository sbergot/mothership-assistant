import { Block, Button, Divider, Title } from "UI/Atoms";
import { allSkillsDict } from "Rules/data";
import { Skill } from "UI/Molecules";
import { ReadCharacter } from "./types";

export function Skills({ character }: ReadCharacter) {
  return (
    <Block variant="light">
      <Title>Skills</Title>
      <Divider />
      <div className="flex flex-wrap justify-center items-center gap-4">
        {character.skills.map((s) => (
          <Skill key={s} skill={allSkillsDict[s]} />
        ))}
        <Button onClick={() => {}}>Train skill</Button>
      </div>
    </Block>
  );
}

