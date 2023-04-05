import { analyseStatRoll } from "helpers";
import { AttackRollResult, StatRollResult } from "Rules/types";

export function ShowAttackRoll({ roll, weaponId }: AttackRollResult) {
  const { rollDescritpion, rollValue, target, isSuccess, result } =
    analyseStatRoll(roll);
  return (
    <div>
      <div>Stat roll: {rollDescritpion}</div>
      {result.map((r, i) => (
        <span key={i} className={`mx-1 ${r === rollValue ? "" : "text-mother-4"}`}>
          {r}
        </span>
      ))}
      vs {target} - <span>{isSuccess ? "Success" : "Failure"}!</span>
    </div>
  );
}
