import { Contractor, Npc } from "Rules/types";
import { Rating, Gauge } from "UI/Molecules";

interface Props {
  npc: Npc;
  onTitleClick(): void;
}

export function NpcShort({ npc, onTitleClick }: Props) {
  return (
    <div className="rounded-xl bg-mother-2 flex flex-col gap-4">
      <div
        className="rounded-3xl bg-mother-6 text-mother-1 text-center cursor-pointer hover:bg-mother-5"
        onClick={onTitleClick}
      >
        {npc.name}
      </div>
      <div className="p-4">
        <div className="flex gap-4">
          <Rating title="Combat" value={npc.combat} />
          <Rating title="Instinct" value={npc.instinct} />
        </div>
        <Gauge
          title="Wounds"
          limitName="Maximum"
          current={npc.wounds}
          limit={npc.maxWounds}
        />
      </div>
    </div>
  );
}
