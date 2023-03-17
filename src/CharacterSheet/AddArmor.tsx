import { useState } from "react";
import { allArmors, allArmorDict } from "Rules/data";
import { Armor, ArmorType } from "Rules/types";
import { Block, Button, Title } from "UI/Atoms";
import { clone, formatCredits } from "helpers";
import { Column, Counter, Table } from "UI/Organisms/Table";
import { SetMode, Wallet, WriteBaseChar } from "./types";

function getDefaultSelection(): Record<ArmorType, number> {
  const res = {} as Record<ArmorType, number>;
  allArmors.forEach((a) => {
    res[a.armorType] = 0;
  });
  return res;
}

export function AddArmor({
  setCharacter,
  setMode,
  wallet
}: WriteBaseChar & SetMode & { wallet: Wallet }) {
  const [selected, setSelected] = useState<Record<ArmorType, number>>(
    getDefaultSelection()
  );

  const columns: Column<Armor>[] = [
    {
      name: "Item",
      cell({ elt }) {
        return <div>{elt.name}</div>;
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
              amount={selected[elt.armorType]}
              onDeselect={() =>
                setSelected((s) => ({
                  ...s,
                  [elt.armorType]: s[elt.armorType] - 1,
                }))
              }
              onSelect={() =>
                setSelected((s) => ({
                  ...s,
                  [elt.armorType]: s[elt.armorType] + 1,
                }))
              }
            />
          </div>
        );
      },
    },
  ];

  const totalCost = allArmors
    .map((w) => w.cost * selected[w.armorType])
    .reduce((a, b) => a + b, 0);

  function getNewArmors() {
    const res: Armor[] = [];
    Object.entries(selected).forEach(([key, value]) => {
      for (let i = 0; i < value; i++) {
        res.push(clone(allArmorDict[key as ArmorType]));
      }
    });
    return res;
  }

  return (
    <div className="flex flex-col gap-2 items-center">
      <Block variant="light">
        <Title>Armor</Title>
        <Table columns={columns} rows={allArmors} />
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
                    armor: [...char.armor, ...getNewArmors()],
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
                    armor: [...char.armor, ...getNewArmors()],
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
