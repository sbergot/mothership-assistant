import { Block, Button, Divider, Title } from "UI/Atoms";
import { ReadBaseChar, SetMode } from "./types";
import { formatCredits, isCharacter } from "helpers";

export function Equipment({ character, setMode }: ReadBaseChar & SetMode) {
  return (
    <Block variant="light">
      <Title>Equipment</Title>
      <Divider />
      <div className="flex flex-wrap justify-center items-center gap-4">
        {isCharacter(character) && (
          <Button
            dark
            onClick={() => {
              setMode({ mode: "AddCredits" });
            }}
          >
            {formatCredits(character.credits)}
          </Button>
        )}
        {character.equipment.map((e) => (
          <Button
            key={e.id}
            dark
            onClick={() =>
              setMode({ mode: "ViewEquipment", equipmentId: e.id })
            }
          >
            {e.name}
            {e.quantity > 1 ? ` x${e.quantity}` : ""}
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
