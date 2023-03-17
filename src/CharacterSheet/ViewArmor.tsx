import { Armor } from "Rules/types";
import { Block, Button, Title } from "UI/Atoms";
import { Field, ItemDetails, simpleField } from "UI/Organisms/ItemDetails";
import { WriteCharacter, SetMode, WriteBaseChar } from "./types";

interface Props extends WriteBaseChar, SetMode {
  armor: Armor;
}

const fields: Field<Armor>[] = [
  simpleField("armorPoints", "AP"),
  simpleField("oxygenSupply", "O2 supply"),
  simpleField("armorSpeed", "speed"),
  simpleField("notes", "special"),
];

export function ViewArmor({ setCharacter, setMode, armor }: Props) {
  function back() {
    setMode({ mode: "CharacterSheet" });
  }

  return (
    <div className="flex flex-col gap-2">
      <Block variant="light">
        <Title>{armor.armorType}</Title>
        <ItemDetails fields={fields} item={armor} />
      </Block>
      <div className="flex justify-center gap-2">
        <Button
          rounded
          dark
          onClick={() => {
            setCharacter((character) => ({
              ...character,
              armor: character.armor.filter((c) => c.id !== armor.id),
            }));
            back();
          }}
        >
          Remove weapon
        </Button>
        <Button onClick={back}>Back</Button>
      </div>
    </div>
  );
}
