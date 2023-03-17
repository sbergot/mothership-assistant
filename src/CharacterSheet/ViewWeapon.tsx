import { Weapon } from "Rules/types";
import { Block, Button, Title } from "UI/Atoms";
import { Field, ItemDetails, simpleField } from "UI/Organisms/ItemDetails";
import { WriteCharacter, SetMode, WriteBaseChar } from "./types";

interface Props extends WriteBaseChar, SetMode {
  weapon: Weapon;
}

const fields: Field<Weapon>[] = [
  simpleField("weaponRange", "range"),
  simpleField("shots", "shots"),
  simpleField("critical", "critical"),
  simpleField("damageString", "damage"),
  simpleField("special", "special"),
  simpleField("magazines", "magazines"),
  simpleField("magazineSize", "magazine size"),
];

export function ViewWeapon({ setCharacter, setMode, weapon }: Props) {
  function back() {
    setMode({ mode: "CharacterSheet" });
  }

  return (
    <div className="flex flex-col gap-2">
      <Block variant="light">
        <Title>{weapon.weaponType}</Title>
        <ItemDetails fields={fields} item={weapon} />
      </Block>
      <div className="flex justify-center gap-2">
        <Button
          rounded
          dark
          onClick={() => {
            setCharacter((character) => ({
              ...character,
              weapons: character.weapons.filter((c) => c.id !== weapon.id),
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
