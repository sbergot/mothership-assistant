import { Block, Button2, Title } from "../UI/Atoms";
import { Gauge } from "../UI/Molecules";
import { StepProps } from "./types";

export function GainStress({ character, onConfirm }: StepProps) {
  const done = true;

  return (
    <div className="flex flex-col">
      <Block variant="light">
        <Title>5. Gain stress</Title>
        <div className="flex justify-around">
          <Gauge
            title="Stress"
            limitName="Minimum"
            current={character.stress}
            limit={character.minStress}
          />
        </div>
      </Block>
      <div className="self-center">
        <Button2 disabled={!done} onClick={() => onConfirm(character)}>
          Confirm
        </Button2>
      </div>
    </div>
  );
}
