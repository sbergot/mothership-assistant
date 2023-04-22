import { loadouts } from "Rules/Data/loadouts";
import { Title } from "UI/Atoms";
import { Table } from "UI/Organisms/Table";
import { armorColumns, equipmentColumns, weaponsColumns } from "./columns";

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
              {l.armors.length > 0 && (
                <Table columns={armorColumns} rows={l.armors} />
              )}
              {l.weapons.length > 0 && (
                <Table columns={weaponsColumns} rows={l.weapons} />
              )}
              {l.equipments.length > 0 && (
                <Table columns={equipmentColumns} rows={l.equipments} />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
