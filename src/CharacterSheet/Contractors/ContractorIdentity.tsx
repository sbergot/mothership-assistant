import { Block } from "UI/Atoms";
import { ReadWriteContractor } from "./types";

export function ContractorIdentity({ contractor, setContractor }: ReadWriteContractor) {
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
    </Block>
  );
}
