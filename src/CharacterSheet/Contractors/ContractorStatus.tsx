import { SetMode } from "CharacterSheet/types";
import { Block, Title } from "UI/Atoms";
import { Gauge } from "UI/Molecules";
import { ReadWriteContractor } from "./types";

export function ContractorStatus({ contractor, setContractor, setMode }: ReadWriteContractor & SetMode) {
  return (
    <Block variant="light">
      <Title>Status report</Title>
      <div className="flex justify-around">
        <Gauge
          title="Wounds"
          limitName="Maximum"
          current={contractor.wounds}
          onChange={n => setContractor(char => ({...char, wounds: n}))}
          limit={contractor.maxWounds}
        />
      </div>
    </Block>
  );
}
