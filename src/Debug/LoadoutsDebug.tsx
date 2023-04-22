import { loadouts } from "Rules/Data/loadouts";
import { Equipment } from "Rules/types";
import { Armor, Weapon } from "Rules/types";
import { Divider, Title } from "UI/Atoms";
import { Column, Table } from "UI/Organisms/Table";
import { formatCredits } from "helpers";

function simpleColumn<T, K extends string & keyof T>(key: K, className: string = ""): Column<T> {
    return   {
        name: key,
        cell({ elt }) {
          return (
            <div className={className}>
                {elt[key] as string}
            </div>
          );
        },
      }        
}

const weaponsColumns: Column<Weapon>[] = [
  simpleColumn("baseType"),
  simpleColumn("name"),
  simpleColumn("weaponType"),
  simpleColumn("damageString"),
  simpleColumn("critical"),
  simpleColumn("magazines"),
  simpleColumn("magazineSize"),
  simpleColumn("shots"),
  simpleColumn("special", "text-xs"),
  simpleColumn("cost"),
];


const armorColumns: Column<Armor>[] = [
    simpleColumn("armorType"),
    simpleColumn("name"),
    simpleColumn("armorPoints"),
    simpleColumn("armorSpeed"),
    simpleColumn("oxygenSupply"),
    simpleColumn("notes", "text-xs"),
    simpleColumn("cost"),
  ];

  

const equipmentColumns: Column<Equipment>[] = [
    simpleColumn("baseType"),
    simpleColumn("name"),
    simpleColumn("quantity"),
    simpleColumn("description", "text-xs"),
    simpleColumn("cost"),
  ];

export function LoadoutsDebug() {
  return (
    <div className="text-base">
      <Title>loadouts debug</Title>
      {Object.entries(loadouts).map(([k, v]) => (
        <div className="flex flex-col gap-4">
          <div>{k}</div>
          {v.map((l, i) => (
            <div className="flex flex-col gap-2">
              <div>{i}</div>
              {l.armors.length > 0 && <Table columns={armorColumns} rows={l.armors} />}
              {l.weapons.length > 0 && <Table columns={weaponsColumns} rows={l.weapons} />}
              {l.equipments.length > 0 && <Table columns={equipmentColumns} rows={l.equipments} />}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
