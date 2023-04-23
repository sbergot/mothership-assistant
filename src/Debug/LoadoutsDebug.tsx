import { loadouts } from "Rules/Data/loadouts";
import { Title } from "UI/Atoms";
import { Table } from "UI/Organisms/Table";
import { armorColumns, equipmentColumns, weaponsColumns } from "./columns";

export function LoadoutsDebug() {
  return (
    <div className="text-base">
      <Title>loadouts debug</Title>
      <div className="flex flex-col gap-4">
        {Object.entries(loadouts).map(([k, v]) => (
          <div className="flex flex-col gap-4">
            <div className="text-lg">{k}</div>
            {v.map((l, i) => (
              <div className="flex flex-col">
                <div>{i}</div>
                <div>
                  {l.armors[0].name} - {l.armors[0].armorPoints} AP
                </div>
                <div>
                  {l.weapons.map((w) => (
                    <div>
                      {w.weaponType} - {w.damageString} - mag size{" "}
                      {w.magazineSize ?? "NA"} - mag num {w.magazines ?? "NA"} -
                      rounds {w.shots ?? "NA"}
                    </div>
                  ))}
                </div>
                <div>
                  {l.equipments.map((e) => (
                    <div>
                      {e.name} X {e.quantity} - {e.cost} creds
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
