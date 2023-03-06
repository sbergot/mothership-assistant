import { Block, Button, Divider, Tag, Title } from "UI/Atoms";
import { Character } from "Rules/types";

interface Props {
  character: Character;
}

export function Armor({ character }: Props) {
  return (
    <Block variant="light">
      <Title>Armor</Title>
      <Divider />
      <div className="flex flex-wrap justify-center items-center gap-4">
        {character.armor.map((a) => (
          <Tag key={a.id} variant="dark">
            {a.name} (AP {a.armorPoints})
          </Tag>
        ))}
        <Button onClick={() => {}}>Add armor</Button>
      </div>
    </Block>
  );
}
