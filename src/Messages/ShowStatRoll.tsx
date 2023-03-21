import { analyseStatRoll } from "helpers";
import { StatRollResult } from "Rules/types";

export function ShowStatRoll(rollResult: StatRollResult) {
  const { rollDescritpion, rollValue, target, isSuccess, result } =
    analyseStatRoll(rollResult);
  return (
    <div>
      <div>Stat roll: {rollDescritpion}</div>
      {result.map((r) => (
        <span className={`mx-1 ${r === rollValue ? "" : "text-mother-4"}`}>
          {r}
        </span>
      ))}
      vs {target} - <span>{isSuccess ? "Success" : "Failure"}!</span>
    </div>
  );
}
