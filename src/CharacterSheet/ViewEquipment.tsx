import { Armor, Equipment } from "Rules/types";
import { Block, Button, Divider, Title } from "UI/Atoms";
import { Rating } from "UI/Molecules";
import { Field, ItemDetails, simpleField } from "UI/Organisms/ItemDetails";
import { WriteCharacter, SetMode, WriteBaseChar } from "./types";

interface Props extends WriteBaseChar, SetMode {
  equipment: Equipment;
}

export function ViewEquipment({ setCharacter, setMode, equipment }: Props) {
  function back() {
    setMode({ mode: "CharacterSheet" });
  }

  return (
    <div className="flex flex-col gap-2">
      <Block variant="light">
        <Title>{equipment.name}</Title>
        {equipment.description && (
          <>
            <div>{equipment.description}</div>
            <Divider />
          </>
        )}
        <Rating title="Quantity" value={equipment.quantity} onUpdate={(newVal) => setCharacter(char => {
          return {
            ...char,
            equipment: char.equipment.map(e => {
              if (e.id !== equipment.id) { return e }
              return { ...e, quantity: newVal }
            })
          }
        })} />
      </Block>
      <div className="flex justify-center gap-2">
        <Button
          rounded
          dark
          onClick={() => {
            setCharacter((character) => ({
              ...character,
              equipment: character.equipment.filter(
                (c) => c.id !== equipment.id
              ),
            }));
            back();
          }}
        >
          Remove equipment
        </Button>
        <Button onClick={back}>Back</Button>
      </div>
    </div>
  );
}
