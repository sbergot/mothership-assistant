import { analyseStatRoll } from "helpers";
import { AttackRollResult, StatRollResult } from "Rules/types";
import { MessageContext } from "./types";
import { Button } from "UI/Atoms";

export function ShowAttackRoll({
  roll,
  weaponId,
  context,
}: AttackRollResult & { context: MessageContext}) {
  const { rollDescritpion, rollValue, target, isSuccess, result } =
    analyseStatRoll(roll);
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
      {isSuccess && context.isOwnMessage && context.type === "player" &&  (
        <Button onClick={() => {}}>Deal damage</Button>
      )}
    </div>
  );
}
