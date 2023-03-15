import { useState } from "react";
import { allArmors, allContractorTypes, allContractors, allContractorDict } from "Rules/data";
import { Contractor, ContractorType } from "Rules/types";
import { Block, Button, Title } from "UI/Atoms";
import { clone, formatCredits } from "helpers";
import { Column, Counter, Table } from "UI/Organisms/Table";
import { ReadWriteCharacter, SetMode } from "./types";
import { roll } from "Services/diceServices";

function getDefaultSelection(): Record<ContractorType, number> {
  const res = {} as Record<ContractorType, number>;
  allContractorTypes.forEach((a) => {
    res[a] = 0;
  });
  return res;
}

function rollContractor(base: Contractor): Contractor {
  return {
    ...base,
    loyalty: roll(2, 10) + 10,
  };
}

export function AddContractor({
  character,
  setCharacter,
  setMode,
}: ReadWriteCharacter & SetMode) {
  const [selected, setSelected] = useState<Record<ContractorType, number>>(
    getDefaultSelection()
  );

  const columns: Column<Contractor>[] = [
    {
      name: "Item",
      cell({ elt }) {
        return <div>{elt.name}</div>;
      },
    },
    {
      name: "Salary",
      className: "w-24",
      cell({ elt }) {
        return <div className="text-center">{formatCredits(elt.salary)}</div>;
      },
    },
    {
      name: "Buy",
      className: "w-24",
      cell({ elt }) {
        return (
          <div className="mx-auto">
            <Counter
              amount={selected[elt.type]}
              onDeselect={() =>
                setSelected((s) => ({
                  ...s,
                  [elt.type]: s[elt.type] - 1,
                }))
              }
              onSelect={() =>
                setSelected((s) => ({
                  ...s,
                  [elt.type]: s[elt.type] + 1,
                }))
              }
            />
          </div>
        );
      },
    },
  ];

  const totalCost = allContractors
    .map((w) => w.salary * selected[w.type])
    .reduce((a, b) => a + b, 0);

  function getNewContractors() {
    const res: Contractor[] = [];
    Object.entries(selected).forEach(([key, value]) => {
      for (let i = 0; i < value; i++) {
        res.push(rollContractor(allContractorDict[key as ContractorType]));
      }
    });
    return res;
  }

  return (
    <div className="flex flex-col gap-2 items-center">
      <Block variant="light">
        <Title>Contractors</Title>
        <Table columns={columns} rows={allContractors} />
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
                    contractors: [...char.contractors, ...getNewContractors()],
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
                    contractors: [...char.contractors, ...getNewContractors()],
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
