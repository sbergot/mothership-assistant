import { Block, Button, Divider, Title } from "../Atoms";
import { allSkillsDict } from "../Data/data";
import { Character } from "../types";

interface Props {
  character: Character;
}

export function Skills({ character }: Props) {
  return (
    <Block variant="light">
      <Title>Skills</Title>
      <Divider />
      <div className="flex flex-wrap justify-center items-center gap-4">
        {character.skills.map(s => <Skill bonus={10} name={allSkillsDict[s].name} />)}
        <Button onClick={() => {}}>Train skill</Button>
      </div>
    </Block>
  );
}

interface SkillProps {
  bonus: number;
  name: string;
}

export function Skill({ bonus, name }: SkillProps) {
  return (
    <span className="rounded-lg border-2 bg-mother-5 text-mother-1 border-mother-5 text-lg">
      <span className="inline-block px-1 rounded-md bg-mother-1 text-mother-5">
        +{bonus}
      </span>
      <span className="px-2">{name}</span>
    </span>
  );
}
