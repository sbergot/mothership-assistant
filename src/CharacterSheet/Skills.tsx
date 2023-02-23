import { Block, Divider } from "../Atoms";

export function Skills() {
  return <Block variant="light">
    <Divider />
    <div className="flex justify-center items-center gap-8">
    <Skill bonus={10} name="Art" />
    <Skill bonus={10} name="Athletics" />
    <Skill bonus={10} name="Mathematics" />
    </div>
  </Block>
}

interface SkillProps {
  bonus: number;
  name: string;
}

export function Skill({ bonus, name }: SkillProps) {
  return (
    <span className="rounded-lg border-2 bg-mother-4 text-mother-1 border-mother-4 text-lg">
      <span className="inline-block px-1 rounded-md bg-mother-1 text-mother-4">+ {bonus}</span>
      <span className="px-2">{name}</span>
    </span>
  );
}