import { Weapon, Armor, Equipment } from "Rules/types";
import { Column } from "UI/Organisms/Table";

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

export const weaponsColumns: Column<Weapon>[] = [
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


export const armorColumns: Column<Armor>[] = [
    simpleColumn("armorType"),
    simpleColumn("name"),
    simpleColumn("armorPoints"),
    simpleColumn("armorSpeed"),
    simpleColumn("oxygenSupply"),
    simpleColumn("notes", "text-xs"),
    simpleColumn("cost"),
  ];

  

export const equipmentColumns: Column<Equipment>[] = [
    simpleColumn("baseType"),
    simpleColumn("name"),
    simpleColumn("quantity"),
    simpleColumn("description", "text-xs"),
    simpleColumn("cost"),
  ];

export function sortBy<T, K extends string & keyof T>(list: T[], prop: K) {
    function sorter(a: T,b: T) {
        return ((a[prop] < b[prop]) ? -1 : ((a[prop] > b[prop]) ? 1 : 0));
    };

    const result = [...list];
    result.sort(sorter);
    return result;
};