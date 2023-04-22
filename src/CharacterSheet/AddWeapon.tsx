import { useState } from "react";
import { allWeaponDict, allWeapons } from "Rules/Data/weapons";
import { Weapon, WeaponType } from "Rules/types";
import { Block, Button, Title } from "UI/Atoms";
import { clone, formatCredits } from "helpers";
import { Column, Counter, Table } from "UI/Organisms/Table";
import { SetMode, Wallet, WriteBaseChar } from "./types";

function getDefaultSelection(): Record<WeaponType, number> {
  const res = {} as Record<WeaponType, number>;
  allWeapons.forEach((w) => {
    res[w.weaponType] = 0;
  });
  return res;
}

export function AddWeapon({
  setCharacter,
  setMode,
  wallet
}: WriteBaseChar & SetMode & { wallet: Wallet }) {
  const [selected, setSelected] = useState<Record<WeaponType, number>>(
    getDefaultSelection()
  );

  const columns: Column<Weapon>[] = [
    {
      name: "Item",
      cell({ elt }) {
        return (
          <div className="py-1">
            <div className="leading-none">{elt.weaponType}</div>
            <div className="text-sm leading-none">{elt.damageString}</div>
          </div>
        );
      },
    },
    {
      name: "Credits",
      className: "w-24",
      cell({ elt }) {
        return <div className="text-center">{formatCredits(elt.cost)}</div>;
      },
    },
    {
      name: "Buy",
      className: "w-24",
      cell({ elt }) {
        return (
          <div className="mx-auto">
            <Counter
              amount={selected[elt.weaponType]}
              onDeselect={() =>
                setSelected((s) => ({
                  ...s,
                  [elt.weaponType]: s[elt.weaponType] - 1,
                }))
              }
              onSelect={() =>
                setSelected((s) => ({
                  ...s,
                  [elt.weaponType]: s[elt.weaponType] + 1,
                }))
              }
            />
          </div>
        );
      },
    },
  ];

  const firearms = allWeapons.filter((w) => w.type === "Firearm");
  const industrial = allWeapons.filter((w) => w.type === "Industrial");
  const melee = allWeapons.filter((w) => w.type === "Melee");

  const totalCost = allWeapons
    .map((w) => w.cost * selected[w.weaponType])
    .reduce((a, b) => a + b, 0);

  function getNewWeapons() {
    const res: Weapon[] = [];
    Object.entries(selected).forEach(([key, value]) => {
      for (let i = 0; i < value; i++) {
        res.push(clone(allWeaponDict[key]));
      }
    });
    return res;
  }

  return (
    <div className="flex flex-col gap-2 items-center">
      <Block variant="light">
        <Title>Firearms</Title>
        <Table columns={columns} rows={firearms} />
      </Block>
      <Block variant="light">
        <Title>Industrial</Title>
        <Table columns={columns} rows={industrial} />
      </Block>
      <Block variant="light">
        <Title>Melee</Title>
        <Table columns={columns} rows={melee} />
      </Block>
      <div className="max-w-md">
        <Block variant="dark">
          <div className="flex flex-col items-center">
            <div>{formatCredits(totalCost)}</div>
            <div>Current credits: {formatCredits(wallet.credits)}</div>
            <div className="flex gap-2">
              <Button
                light
                rounded
                onClick={() => {
                  setCharacter((char) => ({
                    ...char,
                    weapons: [...char.weapons, ...getNewWeapons()],
                  }));
                  wallet.pay(totalCost);
                  setMode({ mode: "CharacterSheet" });
                }}
              >
                Purchase
              </Button>
              <Button
                dark
                rounded
                onClick={() => {
                  setCharacter((char) => ({
                    ...char,
                    weapons: [...char.weapons, ...getNewWeapons()],
                  }));
                  setMode({ mode: "CharacterSheet" });
                }}
              >
                Acquire
              </Button>
            </div>
          </div>
        </Block>
        <div className="flex justify-center pt-2">
          <Button
            onClick={() => {
              setMode({ mode: "CharacterSheet" });
            }}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
}
