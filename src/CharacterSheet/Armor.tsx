import { Block, Button, Divider, Title } from "UI/Atoms";
import { ReadBaseChar, SetMode } from "./types";

export function Armor({ character, setMode }: ReadBaseChar & SetMode) {
  return (
    <Block variant="light">
      <Title>Armor</Title>
      <Divider />
      <div className="flex flex-wrap justify-center items-center gap-4">
        {character.armor.map((a) => (
          <Button key={a.id} onClick={() => setMode({ mode: "ViewArmor", armorId: a.id })} dark>
            {a.name} (AP {a.armorPoints})
          </Button>
        ))}
        <Button onClick={() => {setMode({ mode: "AddArmor" })}}>Add armor</Button>
      </div>
    </Block>
  );
}
