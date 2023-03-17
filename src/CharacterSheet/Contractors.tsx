import { Block, Button, Divider, Title } from "UI/Atoms";
import { Rating, Gauge } from "UI/Molecules";
import { Contractor } from "Rules/types";
import { ReadCharacter, SetMode } from "./types";

export function Contractors({ character, setMode }: ReadCharacter & SetMode) {
  return (
    <Block variant="light">
      <Title>Contractors</Title>
      <Divider />
      <div className="flex flex-wrap justify-center items-center gap-8">
        {character.contractors.map((c) => (
          <ContractorShort
            contractor={c}
            onTitleClick={() =>
              setMode({ mode: "ViewContractor", contractorId: c.id })
            }
          />
        ))}
      </div>
      <div className="flex justify-center items-center mt-2">
        <Button
          onClick={() => {
            setMode({ mode: "AddContractor" });
          }}
        >
          Add contractor
        </Button>
      </div>
    </Block>
  );
}

interface ContractorProps {
  contractor: Contractor;
  onTitleClick(): void;
}

export function ContractorShort({ contractor, onTitleClick }: ContractorProps) {
  return (
    <div className="rounded-xl bg-mother-2 flex flex-col gap-4">
      <div
        className="rounded-3xl bg-mother-6 text-mother-1 text-center cursor-pointer hover:bg-mother-5"
        onClick={onTitleClick}
      >
        {contractor.name}
      </div>
      <div className="p-4">
        <div className="flex gap-4">
          <Rating title="Combat" value={contractor.combat} />
          <Rating title="Instinct" value={contractor.instinct} />
          <Rating title="Loyalty" value={contractor.loyalty} />
        </div>
        <Gauge title="Wounds" limitName="Maximum" current={0} limit={1} />
      </div>
    </div>
  );
}
