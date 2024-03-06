import { analyseRoll } from "helpers";
import { RollResult } from "Rules/types";

export function ShowRestRoll(rollResult: RollResult) {
  const { rollDescritpion, rollValue, target, isSuccess, result } =
    analyseRoll(rollResult);
  return (
    <div>
      <div>Save roll: {rollDescritpion}</div>
      <div>
        {result.map((r, i) => (
          <span
            key={i}
            className={`mx-1 ${r === rollValue ? "" : "text-mother-4"}`}
          >
            {r}
          </span>
        ))}
        vs {target} - <span>{isSuccess ? "Success" : "Failure"}!</span>
      </div>
      {isSuccess && <div>
        relieve {rollValue % 10} stress
      </div>}
    </div>
  );
}
