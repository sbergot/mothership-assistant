import { Log } from "Messages/types";
import { SetMode, WriteCharacter } from "./types";
import { useState } from "react";
import { Block, Button, Divider, Title } from "UI/Atoms";
import { InflictedDamage, InflictedDamageType } from "Rules/types";
import { allWoundTables } from "Rules/Data/wounds";
import {
  woundTypeToCriticalType,
  applyDamage,
  normalizeCriticalType,
} from "Services/damageServices";

export function TakeDamage({
  setCharacter,
  setMode,
  log,
}: WriteCharacter & SetMode & Log) {
  const [damage, setDamage] = useState<InflictedDamage>({
    amount: { result: 0, rolls: [0] },
    inflicted: "health",
    criticalType: "Bleeding",
  });
  const normalizedWoundType = normalizeCriticalType(damage.criticalType)[0]
    .woundType;
  return (
    <Block variant="light">
      <Title>Take damages</Title>
      <div className="flex flex-col gap-2">
        <input
          className="input"
          type="number"
          value={damage.amount.result}
          onChange={(e) => {
            setDamage((d) => {
              const value = parseInt(e.target.value);
              return { ...d, amount: { result: value, rolls: [value] } };
            });
          }}
        />
        <Divider />
        <div className="flex flex-wrap justify-center gap-2">
          {allWoundTables.map((wt) => (
            <div className="shrink-0">
              <Button
                light={normalizedWoundType != wt.woundType}
                rounded
                onClick={() => {
                  setDamage((d) => ({
                    ...d,
                    criticalType: woundTypeToCriticalType(wt.woundType),
                  }));
                }}
              >
                {wt.name}
              </Button>
            </div>
          ))}
        </div>
        <Divider />
        <div className="flex justify-center gap-2">
          <Button
            light={damage.inflicted !== "health"}
            rounded
            onClick={() => {
              setDamage((d) => ({ ...d, inflicted: "health" }));
            }}
          >
            health
          </Button>
          <Button
            light={damage.inflicted !== "wounds"}
            rounded
            onClick={() => {
              setDamage((d) => ({ ...d, inflicted: "wounds" }));
            }}
          >
            wounds
          </Button>
        </div>
        <Divider />
        <div className="flex justify-center gap-2">
          <Button
            dark
            rounded
            onClick={() => {
              setCharacter((c) => applyDamage(c, log, damage));
              setMode({ mode: "CharacterSheet" });
            }}
          >
            roll
          </Button>
          <Button
            rounded
            onClick={() => {
              setMode({ mode: "CharacterSheet" });
            }}
          >
            back
          </Button>
        </div>
      </div>
    </Block>
  );
}
