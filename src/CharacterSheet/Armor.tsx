import { Block, Button, Divider, Tag, Title } from "UI/Atoms";
import { ReadCharacter, SetMode } from "./types";

export function Armor({ character, setMode }: ReadCharacter & SetMode) {
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
        <Button onClick={() => {setMode({ mode: "AddArmor" })}}>Add armor</Button>
      </div>
    </Block>
  );
}
