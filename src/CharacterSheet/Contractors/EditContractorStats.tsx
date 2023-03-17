import { Block, Button, Title } from "UI/Atoms";
import { Rating } from "UI/Molecules";
import { ReadContractor, ReadWriteContractor } from "./types";

interface Props extends ReadWriteContractor {
  back(): void;
}

export function EditContractorStats({
  contractor,
  setContractor,
  back,
}: Props) {
  return (
    <>
      <Block variant="light">
        <Title>Stats</Title>
        <div className="flex justify-center gap-8">
          <Rating
            title="Combat"
            value={contractor.combat}
            onUpdate={(x) => setContractor((char) => ({ ...char, combat: x }))}
          />
          <Rating
            title="Instinct"
            value={contractor.instinct}
            onUpdate={(x) =>
              setContractor((char) => ({ ...char, instinct: x }))
            }
          />
          <Rating
            title="Loyalty"
            value={contractor.loyalty}
            onUpdate={(x) => setContractor((char) => ({ ...char, loyalty: x }))}
          />
        </div>
      </Block>
      <div className="flex justify-center mt-2">
        <Button onClick={back} dark>
          Back
        </Button>
      </div>
    </>
  );
}
