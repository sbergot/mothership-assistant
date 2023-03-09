import { useState } from "react";
import { allWeapons } from "Rules/data";
import { Weapon, WeaponType } from "Rules/types";
import { Block, Title } from "UI/Atoms";
import { Column, Counter, Table } from "UI/Molecules";
import { SetMode, WriteCharacter } from "./types";

function getDefaultSelection(): Record<WeaponType, number> {
  const res = {} as Record<WeaponType, number>;
  allWeapons.forEach((w) => {
    res[w.weaponType] = 0;
  });
  return res;
}

export function AddWeapon({ setCharacter, setMode }: WriteCharacter & SetMode) {
  const [selected, setSelected] = useState<Record<WeaponType, number>>(
    getDefaultSelection()
  );

  const columns: Column<Weapon>[] = [
    {
      name: "Item",
      cell({ elt }) {
        return <span>{elt.weaponType}</span>;
      },
    },
    {
      name: "Credits",
      cell({ elt }) {
        return <span>{elt.cost}</span>;
      },
    },
    {
      name: "Buy",
      cell({ elt }) {
        return (
          <Counter
            amount={selected[elt.weaponType]}
            onDeselect={() =>
              setSelected((s) => ({ ...s, [elt.weaponType]: s[elt.weaponType] - 1 }))
            }
            onSelect={() =>
              setSelected((s) => ({ ...s, [elt.weaponType]: s[elt.weaponType] + 1 }))
            }
          />
        );
      },
    },
  ];

  return (
    <Block variant="light">
      <Title>Firearms</Title>
      <Table columns={columns} rows={allWeapons} />
    </Block>
  );
}
