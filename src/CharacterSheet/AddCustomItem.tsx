import { useState } from "react";
import { Equipment } from "Rules/types";
import { uuidv4 } from "Services/storageServices";
import { Block, Button, Title } from "UI/Atoms";
import { SetMode, WriteBaseChar, WriteCharacter } from "./types";
import { Rating } from "UI/Molecules";

function newCustomItem(name: string, description: string, quantity: number): Equipment {
  return {
    baseType: uuidv4(),
    cost: 0,
    description,
    equipped: true,
    id: uuidv4(),
    name,
    quantity,
  };
}

export function AddCustomItem({
  setCharacter,
  setMode,
}: WriteBaseChar & SetMode) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const done: boolean = !!name;

  function addItem() {
    setCharacter((char) => ({
      ...char,
      equipment: [...char.equipment, newCustomItem(name, description, quantity)],
    }));
    setMode({ mode: "CharacterSheet" });
  }
  return (
    <Block variant="light">
      <Title>Custom item</Title>
      <div>
        <label>Item name</label>
        <input
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <label>Description</label>
        <input
          className="input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <Rating title="Quantity" value={quantity} onUpdate={setQuantity} />
      <div className="flex justify-center mt-4 gap-2">
        <Button rounded dark disabled={!done} onClick={addItem}>
          Confirm
        </Button>
        <Button
          rounded
          dark
          onClick={() => setMode({ mode: "CharacterSheet" })}
        >
          Back
        </Button>
      </div>
    </Block>
  );
}
