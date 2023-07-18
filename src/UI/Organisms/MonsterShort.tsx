import { SetDmMode } from "DmSession/types";
import { Log } from "Messages/types";
import { Monster, RollMode } from "Rules/types";
import {
  deNormalizeCriticalType,
  getDamageDescription,
  rollDamages,
} from "Services/damageServices";
import { rollStat } from "Services/diceServices";
import { Button } from "UI/Atoms";
import { FireIcon } from "UI/Icons";
import { Rating, Gauge, BlockWithTitle, EntryHeader } from "UI/Molecules";

interface Props extends SetDmMode, Log {
  monster: Monster;
  setMonster(setter: (m: Monster) => Monster): void;
  deleteMonster(): void;
}

export function MonsterShort({
  monster,
  setMonster,
  deleteMonster,
  setMode,
  log,
}: Props) {
  const header = (
    <EntryHeader
      title={monster.name}
      visible={monster.visibleToAll}
      onToggleVisibility={() => {
        setMonster((m) => ({ ...m, visibleToAll: !m.visibleToAll }));
      }}
      onDelete={deleteMonster}
      setTitle={(s) => setMonster((m) => ({ ...m, name: s }))}
    />
  );
  function rollMonsterStat(
    stat: "combat" | "speed" | "instinct",
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) {
    const rollMode: RollMode = event.shiftKey
      ? "advantage"
      : event.ctrlKey
      ? "disadvantage"
      : "normal";
    const results = rollStat({
      stat: { value: monster.combat, name: stat },
      skill: null,
      rollMode,
    });
    log({
      type: "StatRollMessage",
      props: results,
      wardenOnly: true,
    });
  }
  return (
    <BlockWithTitle light title={header} className="max-w-md w-full">
      <div className="flex flex-col gap-2">
        <div className="flex justify-center gap-4">
          <Rating
            title="Combat"
            value={monster.combat}
            onUpdate={(v) => setMonster((m) => ({ ...m, combat: v }))}
            onRoll={(e) => {
              rollMonsterStat("combat", e);
            }}
          />

          <Rating
            title="Instinct"
            value={monster.instinct}
            onUpdate={(v) => setMonster((m) => ({ ...m, instinct: v }))}
            onRoll={(e) => {
              rollMonsterStat("instinct", e);
            }}
          />
        </div>
        <div className="flex flex-wrap justify-center gap-x-4">
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
            placeholder="description"
            className="input resize-none h-32"
            onChange={(e) =>
              setMonster((m) => ({ ...m, description: e.target.value }))
            }
          />
        </div>
        {monster.attacks.map((a) => (
          <Button
            dark
            rounded
            onClick={() => {
              log({
                type: "DamageMessage",
                props: {
                  ...rollDamages(
                    a.damage,
                    deNormalizeCriticalType(a.critical),
                    false,
                    a.name
                  ),
                },
              });
            }}
          >
            {a.name} {getDamageDescription(a.damage)} -{" "}
            {deNormalizeCriticalType(a.critical)}
            <FireIcon />
          </Button>
        ))}
        <Button
          dark
          rounded
          onClick={() =>
            setMode({ mode: "ListAttacks", monsterId: monster.id })
          }
        >
          Edit attacks
        </Button>
      </div>
    </BlockWithTitle>
  );
}
