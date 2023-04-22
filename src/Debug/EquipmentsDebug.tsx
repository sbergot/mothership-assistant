import { Title } from "UI/Atoms";
import { Table } from "UI/Organisms/Table";
import { equipmentColumns, sortBy } from "./columns";
import { allEquipment } from "Rules/Data/equipment";

export function EquipmentsDebug() {
  return (
    <div className="text-base">
      <Title>equipments debug</Title>
      <Table columns={equipmentColumns} rows={sortBy(allEquipment, "baseType")} />
    </div>
  );
}
