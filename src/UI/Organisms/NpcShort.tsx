import { Npc } from "Rules/types";
import { ButtonIcon, TrashIcon } from "UI/Icons";
import { Rating, Gauge } from "UI/Molecules";

interface Props {
  npc: Npc;
  setNpc(setter: (m: Npc) => Npc): void;
  deleteNpc(): void;
}

export function NpcShort({ npc, setNpc, deleteNpc }: Props) {
  return (
    <div className="rounded-xl bg-mother-2 flex flex-col gap-4">
      <div className="rounded-3xl bg-mother-6 text-mother-1 text-center flex justify-center">
        <div className="flex-grow">{npc.name}</div>
        <div className="mr-2">
          <ButtonIcon light onClick={deleteNpc}>
            <TrashIcon />
          </ButtonIcon>
        </div>
      </div>
      <div className="py-4 px-8">
        <div className="flex justify-center gap-4">
          <Rating
            title="Combat"
            value={npc.combat}
            onUpdate={(v) => setNpc((m) => ({ ...m, combat: v }))}
          />
          <Rating
            title="Instinct"
            value={npc.instinct}
            onUpdate={(v) => setNpc((m) => ({ ...m, instinct: v }))}
          />
        </div>
        <Gauge
          title="Wounds"
          limitName="Maximum"
          current={npc.wounds}
          limit={npc.maxWounds}
          onChange={(n) => setNpc((m) => ({ ...m, wounds: n }))}
          onChangeLimit={(n) => setNpc((m) => ({ ...m, maxWounds: n }))}
        />
        <div>
          <textarea
            value={npc.description}
            className="input resize-none h-32"
            onChange={(e) =>
              setNpc((m) => ({ ...m, description: e.target.value }))
            }
          />
        </div>
      </div>
    </div>
  );
}
