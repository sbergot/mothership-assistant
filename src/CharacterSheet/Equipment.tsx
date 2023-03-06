import { Block, Button, Divider, Tag, Title } from "UI/Atoms";
import { Character } from "Rules/types";

interface Props {
  character: Character;
}

export function Equipment({ character }: Props) {
  return (
    <Block variant="light">
      <Title>Equipment</Title>
      <Divider />
      <div className="flex flex-wrap justify-center items-center gap-4">
        {character.equipment.map(e => <Tag key={e.id} variant="dark">{e.name}</Tag>)}
        <Button onClick={() => {}}>Add equipment</Button>
        <Button onClick={() => {}}>Custom item</Button>
      </div>
    </Block>
  );
}
