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
          dark
          rounded
          onClick={() => {
            const inflictedDamage: InflictedDamage = {
              amount,
              criticalType,
              inflicted,
            };
            if (context.type === "player") {
              // not using setter function because it is run twice and we are emitting messages
              const newChar = applyDamage(
                context.character,
                context.log,
                inflictedDamage
              );
              context.setCharacter((c) => newChar);
              return;
            }
            if (context.type === "warden") {
              context.setMode({ mode: "DealDamage", damage: inflictedDamage });
            }
          }}
        >
          Take damage
        </Button>
      </div>
    </div>
  );
}
