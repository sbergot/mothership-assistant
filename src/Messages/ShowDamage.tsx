import { InflictedDamage } from "Rules/types";
import { MessageContext } from "./types";
import { Button } from "UI/Atoms";
import { applyDamage } from "Services/damageServices";

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
      <div>
        <Button
          onClick={() => {
            if (context.type === "player") {
              context.setCharacter(c => applyDamage(c, context.log, {
                amount,
                criticalType,
                inflicted,
              }));
            }
          }}
        >
          Take damage
        </Button>
      </div>
    </div>
  );
}
