import { Log } from "Messages/types";
import { SetMode, WriteCharacter } from "./types";
import { useState } from "react";
import { Block, Button, Title } from "UI/Atoms";
import { InflictedDamage, InflictedDamageType } from "Rules/types";
import { allWoundTables } from "Rules/Data/wounds";

export function TakeDamage({
  setCharacter,
  setMode,
  log,
}: WriteCharacter & SetMode & Log) {
  const [damage, setDamage] = useState<InflictedDamage>({
    amount: 0,
    inflicted: "health",
    type: "bleeding",
  });
  return (
    <Block variant="light">
      <Title>Take damages</Title>
      <input
        className="input"
        type="number"
        value={damage.amount}
        onChange={(e) => {
          setDamage((d) => ({ ...d, amount: parseInt(e.target.value) }));
        }}
      />
      <div className="flex justify-center gap-2">
        {allWoundTables.map((wt) => (
          <Button
            light={damage.type != wt.woundType}
            rounded
            onClick={() => {
              setDamage((d) => ({ ...d, type: wt.woundType }));
            }}
          >
            {wt.name}
          </Button>
        ))}
      </div>
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
    </Block>
  );
}
