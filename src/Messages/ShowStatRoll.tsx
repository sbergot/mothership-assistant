import { analyseStatRoll } from "helpers";
import { StatRollResult } from "Rules/types";

export function ShowStatRoll(rollResult: StatRollResult) {
  const { rollDescritpion, rollValue, target, isSuccess, result, isCritical } =
    analyseStatRoll(rollResult);
  return (
    <div>
      <div>Stat roll: {rollDescritpion}</div>
      {result.map((r, i) => (
        <span key={i} className={`mx-1 ${r === rollValue ? "" : "text-mother-4"}`}>
          {r}
        </span>
      ))}
      vs {target} - <span>{isCritical ? "Critical " : ""}{isSuccess ? "Success" : "Failure"}!</span>
    </div>
  );
}
