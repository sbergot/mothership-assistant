import { Monster } from "Rules/types";
import { ButtonIcon, EyeIcon, EyeSlashIcon, TrashIcon } from "UI/Icons";
import { Rating, Gauge } from "UI/Molecules";

interface Props {
  monster: Monster;
  setMonster(setter: (m: Monster) => Monster): void;
  deleteMonster(): void;
}

export function MonsterShort({ monster, setMonster, deleteMonster }: Props) {
  return (
    <div className="rounded-xl bg-mother-2 flex flex-col gap-4">
      <div className="rounded-3xl bg-mother-6 text-mother-1 text-center flex justify-center">
        <div className="flex-grow">{monster.name}</div>
        <div className="mr-2 flex gap-1">
          <ButtonIcon
            light
            onClick={() => {
              setMonster((m) => ({ ...m, visibleToAll: !m.visibleToAll }));
            }}
          >
            {monster.visibleToAll ? <EyeIcon /> : <EyeSlashIcon />}
          </ButtonIcon>
          <ButtonIcon light onClick={deleteMonster}>
            <TrashIcon />
          </ButtonIcon>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-center gap-4">
          <Rating
            title="Combat"
            value={monster.combat}
            onUpdate={(v) => setMonster((m) => ({ ...m, combat: v }))}
          />
          <Rating
            title="Instinct"
            value={monster.instinct}
            onUpdate={(v) => setMonster((m) => ({ ...m, instinct: v }))}
          />
        </div>
        <div className="flex flex-wrap justify-center gap-x-4 mt-4">
          <Gauge
            title="Health"
            limitName="Maximum"
            onChange={(n) => setMonster((m) => ({ ...m, health: n }))}
            current={monster.health}
            limit={monster.maxHealth}
            onChangeLimit={(n) => setMonster((m) => ({ ...m, maxHealth: n }))}
          />
          <Gauge
            title="Wounds"
            limitName="Maximum"
            onChange={(n) => setMonster((m) => ({ ...m, wounds: n }))}
            current={monster.wounds}
            limit={monster.maxWounds}
            onChangeLimit={(n) => setMonster((m) => ({ ...m, maxWounds: n }))}
          />
        </div>
        <div>
          <textarea
            value={monster.description}
            className="input resize-none h-32"
            onChange={(e) =>
              setMonster((m) => ({ ...m, description: e.target.value }))
            }
          />
        </div>
      </div>
    </div>
  );
}
