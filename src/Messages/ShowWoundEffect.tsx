import { allWoundTablesDict } from "Rules/Data/wounds";
import { WoundEffectEntry } from "Rules/types";

export function ShowWoundEffect({ woundRoll, type }: WoundEffectEntry) {
  const woundTable = allWoundTablesDict[type];
  const { result, rolls } = woundRoll;
  const woundEffect = woundTable.effects[result - 1];

  return (
    <div>
      Rolled{" "}
      {rolls.map((r, i) => (
        <span key={i} className={`mx-1 ${r === result ? "" : "text-mother-4"}`}>
          {r}
        </span>
      ))}{" "}
      on {woundTable.name} - {woundEffect.description}
    </div>
  );
}
