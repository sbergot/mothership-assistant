import { Block, Button, Divider, Title } from "UI/Atoms";
import { ReadBaseChar, SetMode } from "./types";

export function Equipment({ character, setMode }: ReadBaseChar & SetMode) {
  return (
    <Block variant="light">
      <Title>Equipment</Title>
      <Divider />
      <div className="flex flex-wrap justify-center items-center gap-4">
        {character.equipment.map((e) => (
          <Button
            key={e.id}
            dark
            onClick={() => setMode({ mode: "ViewEquipment", equipmentId: e.id })}
          >
            {e.name}
          </Button>
        ))}
        <Button
          onClick={() => {
            setMode({ mode: "AddEquipment" });
          }}
        >
          Add equipment
        </Button>
        <Button
          onClick={() => {
            setMode({ mode: "AddCustomItem" });
          }}
        >
          Custom item
        </Button>
      </div>
    </Block>
  );
}
