import { Title } from "UI/Atoms";
import { Table } from "UI/Organisms/Table";
import { armorColumns, sortBy } from "./columns";
import { allArmors } from "Rules/data";

export function ArmorsDebug() {
  return (
    <div className="text-base">
      <Title>armors debug</Title>
      <Table columns={armorColumns} rows={sortBy(allArmors, "armorType")} />
    </div>
  );
}
