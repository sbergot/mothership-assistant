import { Block, Button, Divider, Title } from "UI/Atoms";
import { allSkillsDict } from "Rules/data";
import { Skill } from "UI/Molecules";
import { Character } from "Rules/types";

interface Props {
  character: Character;
}

export function Skills({ character }: Props) {
  return (
    <Block variant="light">
      <Title>Skills</Title>
      <Divider />
      <div className="flex flex-wrap justify-center items-center gap-4">
        {character.skills.map((s) => (
          <Skill skill={allSkillsDict[s]} />
        ))}
        <Button onClick={() => {}}>Train skill</Button>
      </div>
    </Block>
  );
}

