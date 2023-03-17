import { SetMode } from "CharacterSheet/types";
import { Block, Button, Title } from "UI/Atoms";
import { Rating } from "UI/Molecules";
import { ReadContractor } from "./types";

export function ContractorStats({
  contractor,
  setMode,
}: ReadContractor & SetMode) {
  return (
    <Block variant="light">
      <Title>Stats</Title>
      <div className="flex justify-center gap-8">
        <Rating title="Combat" value={contractor.combat} />
        <Rating title="Instinct" value={contractor.instinct} />
        <Rating title="Loyalty" value={contractor.loyalty} />
      </div>
      <div className="flex justify-center mt-2">
        <Button onClick={() => setMode({ mode: "EditStats" })} dark>
          Edit
        </Button>
      </div>
    </Block>
  );
}
