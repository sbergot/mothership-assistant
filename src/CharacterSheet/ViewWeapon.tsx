import { Weapon } from "Rules/types";
import { Block, Button, Title } from "UI/Atoms";
import { Field, ItemDetails } from "UI/Organisms/ItemDetails";
import { WriteCharacter, SetMode } from "./types";

interface Props extends WriteCharacter, SetMode {
  weapon: Weapon;
}

const fields: Field<Weapon>[] = [
  {
    name: "range",
    cell({ elt }) {
      return <span>{elt.weaponRange}</span>;
    },
  },
  {
    name: "shots",
    cell({ elt }) {
      return <span>{elt.shots}</span>;
    },
  },
  {
    name: "range",
    cell({ elt }) {
      return <span>{elt.weaponRange}</span>;
    },
  },
  {
    name: "critical",
    cell({ elt }) {
      return <span>{elt.critical}</span>;
    },
  },
  {
    name: "special",
    hidden(elt) {
      return !!elt.special;
    },
    cell({ elt }) {
      return <span>{elt.special}</span>;
    },
  },
  {
    name: "magazines",
    cell({ elt }) {
      return <span>{elt.magazines}</span>;
    },
  },
  {
    name: "magazine size",
    cell({ elt }) {
      return <span>{elt.magazineSize}</span>;
    },
  },
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
