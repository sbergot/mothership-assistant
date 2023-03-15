import { useState } from "react";
import { Equipment } from "Rules/types";
import { uuidv4 } from "Services/services";
import { Block, Button, Title } from "UI/Atoms";
import { SetMode, WriteCharacter } from "./types";

function newCustomItem(name: string, description: string): Equipment {
  return {
    baseType: uuidv4(),
    cost: 0,
    description,
    equipped: true,
    id: uuidv4(),
    name,
    quantity: 1,
  };
}

export function AddCustomItem({
  setCharacter,
  setMode,
}: WriteCharacter & SetMode) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const done = name && description;

  function addItem() {
    setCharacter((char) => ({
      ...char,
      equipment: [...char.equipment, newCustomItem(name, description)],
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
      <div>
        <label>Description</label>
        <input
          className="input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="flex flex-col items-center mt-4 gap-2">
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
