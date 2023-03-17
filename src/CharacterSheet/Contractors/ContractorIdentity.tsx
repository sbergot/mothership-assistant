import { StringProperties } from "BaseTypes";
import { formatCredits } from "helpers";
import { Contractor } from "Rules/types";
import { Block } from "UI/Atoms";
import { ReadContractor, ReadWriteContractor } from "./types";


function Field({
  contractor,
  setContractor,
  field,
}: ReadWriteContractor & { field: StringProperties<Contractor> }) {
  return (
    <Block variant="bright" small>
      <input
        value={contractor[field]}
        onChange={(e) =>
          setContractor((char) => ({ ...char, [field]: e.target.value }))
        }
      />
    </Block>
  );
}

export function ContractorIdentity({ contractor, setContractor }: ReadWriteContractor) {
  return (
    <Block variant="dark">
      <div>
        <label>Character Name</label>
        <Field contractor={contractor} setContractor={setContractor} field="name" />
      </div>
      <div>
        <label>Pronouns</label>
        <Field contractor={contractor} setContractor={setContractor} field="pronouns" />
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
