import { useState } from "react";
import { allEquipment, allEquipmentDict } from "Rules/data";
import { Equipment } from "Rules/types";
import { Block, Button, Title } from "UI/Atoms";
import { clone, formatCredits } from "helpers";
import { Column, Counter, Table } from "UI/Organisms/Table";
import { ReadWriteCharacter, SetMode } from "./types";

function getDefaultSelection(): Record<string, number> {
  const res = {} as Record<string, number>;
  allEquipment.forEach((a) => {
    res[a.baseType] = 0;
  });
  return res;
}

export function AddEquipment({
  character,
  setCharacter,
  setMode,
}: ReadWriteCharacter & SetMode) {
  const [selected, setSelected] = useState<Record<string, number>>(
    getDefaultSelection()
  );

  const columns: Column<Equipment>[] = [
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
              amount={selected[elt.baseType]}
              onDeselect={() =>
                setSelected((s) => ({
                  ...s,
                  [elt.baseType]: s[elt.baseType] - 1,
                }))
              }
              onSelect={() =>
                setSelected((s) => ({
                  ...s,
                  [elt.baseType]: s[elt.baseType] + 1,
                }))
              }
            />
          </div>
        );
      },
    },
  ];

  const totalCost = allEquipment
    .map((w) => w.cost * selected[w.baseType])
    .reduce((a, b) => a + b, 0);

  function getNewEquipments() {
    const res: Equipment[] = [];
    Object.entries(selected).forEach(([key, value]) => {
      for (let i = 0; i < value; i++) {
        res.push(clone(allEquipmentDict[key]));
      }
    });
    return res;
  }

  return (
    <div className="flex flex-col gap-2 items-center">
      <Block variant="light">
        <Title>Armor</Title>
        <Table columns={columns} rows={allEquipment} />
      </Block>
      <div className="max-w-md">
        <Block variant="dark">
          <div className="flex flex-col items-center">
            <div>{formatCredits(totalCost)}</div>
            <div>Current credits: {formatCredits(character.credits)}</div>
            <div className="flex gap-2">
              <Button
                light
                rounded
                onClick={() => {
                  setCharacter((char) => ({
                    ...char,
                    equipment: [...char.equipment, ...getNewEquipments()],
                    credits: char.credits - totalCost,
                  }));
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
                    equipment: [...char.equipment, ...getNewEquipments()],
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
