import { InflictedDamage } from "Rules/types";
import { MessageContext } from "./types";

export function ShowDamage({
  amount,
  criticalType,
  inflicted,
  context,
}: InflictedDamage & { context: MessageContext }) {
  const { result, rolls } = amount;
  return (
    <div>
      <div>Damage</div>
      {rolls.map((r, i) => (
        <span key={i} className={`mx-1 ${r === result ? "" : "text-mother-4"}`}>
          {r}
        </span>
      ))}
      <span>
        - {criticalType} - {inflicted}
      </span>
    </div>
  );
}
