import { analyseStatRoll } from "helpers";
import { AttackRollResult, StatRollResult } from "Rules/types";
import { MessageContext } from "./types";
import { Button } from "UI/Atoms";
import { rollDamages } from "Services/damageServices";

export function ShowAttackRoll({
  roll,
  weaponId,
  context,
}: AttackRollResult & { context: MessageContext }) {
  const { rollDescritpion, rollValue, target, isSuccess, result } =
    analyseStatRoll(roll);
  const weapon =
    context.type === "player"
      ? context.character.weapons.find((w) => w.id === weaponId)
      : undefined;
  const damages = weapon !== undefined ? weapon.damage : [];
  return (
    <div>
      <div>Stat roll: {rollDescritpion}</div>
      {result.map((r, i) => (
        <span
          key={i}
          className={`mx-1 ${r === rollValue ? "" : "text-mother-4"}`}
        >
          {r}
        </span>
      ))}
      <span>
        vs {target} - {isSuccess ? "Success" : "Failure"}!
      </span>
      <div>
        {isSuccess &&
          context.isOwnMessage &&
          damages.map((d) => (
            <Button
              onClick={() => {
                context.log({
                  type: "DamageMessage",
                  props: { ...rollDamages(d, weapon!.critical) },
                });
              }}
            >
              Roll damage {d.damageType}
            </Button>
          ))}
      </div>
    </div>
  );
}
