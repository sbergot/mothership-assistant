import { formatCredits, updateInList } from "helpers";
import { useState } from "react";
import { Weapon } from "Rules/types";
import { Block, Button, Title } from "UI/Atoms";
import { Rating } from "UI/Molecules";
import { Field, ItemDetails, simpleField } from "UI/Organisms/ItemDetails";
import { SetMode, Wallet, WriteBaseChar } from "./types";

interface Props extends WriteBaseChar, SetMode {
  weapon: Weapon;
  wallet: Wallet;
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

export function ViewWeapon({ setCharacter, setMode, weapon, wallet }: Props) {
  const [magazines, setMagazines] = useState(weapon.magazines || 0);
  const totalCost = (magazines - (weapon.magazines || 0)) * 50;
  function back() {
    setMode({ mode: "CharacterSheet" });
  }

  function updateMagazines() {
    setCharacter((char) => {
      return {
        ...char,
        weapons: char.weapons.map((w) => {
          if (w.id !== weapon.id) {
            return w;
          }
          return { ...w, magazines };
        }),
      };
    });
  }

  return (
    <div className="flex flex-col gap-2">
      <Block variant="light">
        <Title>{weapon.weaponType}</Title>
        <ItemDetails fields={fields} item={weapon} />
        <div className="flex justify-center gap-4">
          {weapon.magazines !== null && (
            <div className="mt-2">
              <Rating
                title="Magazines"
                value={magazines}
                onUpdate={setMagazines}
              />
            </div>
          )}
          {weapon.shots !== null && (
            <div className="mt-2">
              <Rating
                title="Shots"
                value={weapon.shots}
                onUpdate={(value) =>
                  setCharacter((c) => ({
                    ...c,
                    weapons: updateInList(c.weapons, weapon.id, (w) => ({
                      ...w,
                      shots: value,
                    })),
                  }))
                }
              />
            </div>
          )}
        </div>
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
      {weapon.magazines !== null && weapon.magazines !== magazines && (
        <div className="flex justify-center gap-2">
          <Button
            onClick={() => {
              updateMagazines();
              wallet.pay(totalCost);
              back();
            }}
          >
            Purchase ({formatCredits(totalCost)})
          </Button>
          <Button
            onClick={() => {
              updateMagazines();
              back();
            }}
          >
            Aquire
          </Button>
        </div>
      )}
    </div>
  );
}
