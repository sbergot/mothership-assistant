import { Block, Button, Divider, Title } from "UI/Atoms";
import { ReadCharacter, SetMode } from "./types";
import { ContractorShort } from "UI/Organisms/ContractorShort";

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
