import { Contractor, Monster, Npc } from "Rules/types";
import { Rating, Gauge } from "UI/Molecules";

interface Props {
  monster: Monster;
  onTitleClick(): void;
}

export function MonsterShort({ monster, onTitleClick }: Props) {
  return (
    <div className="rounded-xl bg-mother-2 flex flex-col gap-4">
      <div
        className="rounded-3xl bg-mother-6 text-mother-1 text-center cursor-pointer hover:bg-mother-5"
        onClick={onTitleClick}
      >
        {monster.name}
      </div>
      <div className="p-4">
        <div className="flex justify-center gap-4">
          <Rating title="Combat" value={monster.combat} />
          <Rating title="Instinct" value={monster.instinct} />
        </div>
        <div className="flex justify-center gap-4">
          <Gauge
            title="Health"
            limitName="Maximum"
            current={monster.health}
            limit={monster.maxHealth}
          />
          <Gauge
            title="Wounds"
            limitName="Maximum"
            current={monster.wounds}
            limit={monster.maxWounds}
          />
        </div>
      </div>
    </div>
  );
}
