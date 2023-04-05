import { allWoundTablesDict } from "Rules/Data/wounds";
import { WoundEffectEntry } from "Rules/types";



export function ShowWoundEffect({ woundRoll, type }: WoundEffectEntry) {
  const woundTable = allWoundTablesDict[type];
  const woundEffect = woundTable.effects[woundRoll - 1];

  return (
    <div>
      Rolled {woundRoll} on {woundTable.name} - {woundEffect.description}
    </div>
  );
}
