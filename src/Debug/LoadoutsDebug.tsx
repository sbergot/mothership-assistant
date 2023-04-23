import { instantiateLoadout, loadoutRefs } from "Rules/Data/loadouts";
import { Title } from "UI/Atoms";
import { Table } from "UI/Organisms/Table";
import { armorColumns, equipmentColumns, weaponsColumns } from "./columns";

export function LoadoutsDebug() {
  return (
    <div className="text-base">
      <Title>loadouts debug</Title>
      <div className="flex flex-col gap-4">
        {Object.entries(loadoutRefs).map(([k, v]) => (
          <div className="flex flex-col gap-4">
            <div className="text-lg">{k}</div>
            {v.map(instantiateLoadout).map((l, i) => (
              <div className="flex flex-col text-sm">
                <div>{i}</div>
                <div>
                  {l.armors[0].name} - {l.armors[0].armorPoints} AP
                </div>
                <div>
                  {l.weapons.map((w) => (
                    <div>
                      {`${w.weaponType} - ${w.damageString} - ${
                        w.magazineSize
                          ? `mag size ${w.magazineSize} - mag num ${w.magazines} - rounds ${w.shots}`
                          : "melee"
                      }`}
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
