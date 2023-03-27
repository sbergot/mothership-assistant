import { Contractor } from "Rules/types";
import { Rating, Gauge } from "UI/Molecules";

interface Props {
  contractor: Contractor;
  onTitleClick(): void;
}

export function ContractorShort({ contractor, onTitleClick }: Props) {
  return (
    <div className="rounded-xl bg-mother-2 flex flex-col gap-4">
      <div
        className="rounded-3xl bg-mother-6 text-mother-1 text-center cursor-pointer hover:bg-mother-5"
        onClick={onTitleClick}
      >
        {contractor.name}
      </div>
      <div className="p-4">
        <div className="flex gap-4">
          <Rating title="Combat" value={contractor.combat} />
          <Rating title="Instinct" value={contractor.instinct} />
          <Rating title="Loyalty" value={contractor.loyalty} />
        </div>
        <Gauge
          title="Wounds"
          limitName="Maximum"
          current={contractor.wounds}
          limit={contractor.maxWounds}
        />
      </div>
    </div>
  );
}
