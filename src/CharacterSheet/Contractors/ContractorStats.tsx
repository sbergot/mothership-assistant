import { Block, Title } from "UI/Atoms";
import { Rating } from "UI/Molecules";
import { ReadContractor } from "./types";

export function ContractorStats({ contractor }: ReadContractor) {
  return (
    <Block variant="light">
      <Title>Stats</Title>
      <div className="flex justify-center gap-8">
        <Rating title="Combat" value={contractor.combat} />
        <Rating title="Combat" value={contractor.instinct} />
        <Rating title="Combat" value={contractor.loyalty} />
      </div>
    </Block>
  );
}
