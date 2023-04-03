import { analysePanicRoll } from "helpers";
import { PanicRollResult } from "Rules/types";

export function ShowPanicRoll(rollResult: PanicRollResult) {
  const { rollDescritpion, rollValue, target, isSuccess, result } =
    analysePanicRoll(rollResult);
  return (
    <div>
      <div>Panic roll: {rollDescritpion}</div>
      {result.map((r, i) => (
        <span key={i} className={`mx-1 ${r === rollValue ? "" : "text-mother-4"}`}>
          {r}
        </span>
      ))}
      vs {target} - <span>{isSuccess ? "Success" : "Failure"}!</span>
    </div>
  );
}
