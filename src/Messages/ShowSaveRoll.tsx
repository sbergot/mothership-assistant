import { analyseSaveRoll } from "helpers";
import { SaveRollResult } from "Rules/types";

export function ShowSaveRoll(rollResult: SaveRollResult) {
  const { rollDescritpion, rollValue, target, isSuccess, result } =
    analyseSaveRoll(rollResult);
  return (
    <div>
      <div>Save roll: {rollDescritpion}</div>
      {result.map((r, i) => (
        <span key={i} className={`mx-1 ${r === rollValue ? "" : "text-mother-4"}`}>
          {r}
        </span>
      ))}
      vs {target} - <span>{isSuccess ? "Success" : "Failure"}!</span>
    </div>
  );
}
