import { Npc } from "Rules/types";
import { Rating, Gauge, BlockWithTitle, EntryHeader } from "UI/Molecules";

interface Props {
  npc: Npc;
  setNpc(setter: (m: Npc) => Npc): void;
  deleteNpc(): void;
}

export function NpcShort({ npc, setNpc, deleteNpc }: Props) {
  const header = (
    <EntryHeader
      title={npc.name}
      visible={npc.visibleToAll}
      onToggleVisibility={() => {
        setNpc((m) => ({ ...m, visibleToAll: !m.visibleToAll }));
      }}
      onDelete={deleteNpc}
      setTitle={(s) => setNpc((npc) => ({ ...npc, name: s }))}
    />
  );
  return (
    <BlockWithTitle light title={header}>
      <div className="flex flex-col gap-2">
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
        <div className="flex flex-wrap justify-center gap-x-4">
          <Gauge
            title="Wounds"
            limitName="Maximum"
            onChange={(n) => setNpc((m) => ({ ...m, wounds: n }))}
            current={npc.wounds}
            limit={npc.maxWounds}
            onChangeLimit={(n) => setNpc((m) => ({ ...m, maxWounds: n }))}
          />
        </div>
        <div>
          <textarea
            value={npc.description}
            placeholder="description"
            className="input resize-none h-32"
            onChange={(e) =>
              setNpc((m) => ({ ...m, description: e.target.value }))
            }
          />
        </div>
      </div>
    </BlockWithTitle>
  );
}
