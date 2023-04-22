import { Title } from "UI/Atoms";
import { Table } from "UI/Organisms/Table";
import { sortBy, weaponsColumns } from "./columns";
import { allWeapons } from "Rules/Data/weapons";

export function WeaponsDebug() {
  return (
    <div className="text-base">
      <Title>weapons debug</Title>
      <Table columns={weaponsColumns} rows={sortBy(allWeapons, "baseType")} />
    </div>
  );
}
