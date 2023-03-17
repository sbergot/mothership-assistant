import { formatCredits } from "helpers";
import { Block } from "UI/Atoms";
import { ReadContractor } from "./types";

export function ContractorIdentity({ contractor }: ReadContractor) {
  return (
    <Block variant="dark">
      <div>
        <label>Character Name</label>
        <Block variant="bright" small>
          {contractor.name}
        </Block>
      </div>
      <div>
        <label>Pronouns</label>
        <Block variant="bright" small>
          {contractor.pronouns}
        </Block>
      </div>
      <div>
        <label>Occupation</label>
        <Block variant="bright" small>
          {contractor.occupation}
        </Block>
      </div>
      <div>
        <label>Salary</label>
        <Block variant="bright" small>
          {formatCredits(contractor.salary)}
        </Block>
      </div>
    </Block>
  );
}
