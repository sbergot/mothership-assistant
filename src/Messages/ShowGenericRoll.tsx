import { GenericRollResult } from "Rules/types";

export function ShowGenericRoll({ diceNbr, diceType, rollMode, result }: GenericRollResult) {
  let rollModeDescr = "";
  if (rollMode === "advantage") {
    rollModeDescr = " [+]"
  }
  if (rollMode === "disadvantage") {
    rollModeDescr = " [-]"
  }
  return (
    <div>
      <div>rolled {diceNbr}d{diceType}{rollModeDescr}</div>
      {result.rolls.map((r, i) => (
        <span key={i} className={`mx-1 ${r === result.result ? "" : "text-mother-4"}`}>
          {r}
        </span>
      ))}
    </div>
  );
}
