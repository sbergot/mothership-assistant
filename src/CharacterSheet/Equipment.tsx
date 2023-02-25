import { Block, Button, Divider, Tag, Title } from "../Atoms";
import { Character } from "../types";

interface Props {
  character: Character;
}

export function Equipment({ character }: Props) {
  return (
    <Block variant="light">
      <Title>Equipment</Title>
      <Divider />
      <div className="flex flex-wrap justify-center items-center gap-4">
        {character.equipment.map(e => <Tag variant="dark">{e.name}</Tag>)}
        <Button>Add equipment</Button>
        <Button>Custom item</Button>
      </div>
    </Block>
  );
}
