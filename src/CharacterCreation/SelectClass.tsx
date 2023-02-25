import { Block, Button2, Title } from "../Atoms";
import { allStats } from "../Data/data";
import { Rating } from "../Molecules";
import { roll } from "../Services/diceServices";
import { Character } from "../types";
import { StepProps } from "./types";

export function SelectClass({ character, setCharacter, onConfirm }: StepProps) {
  const done = character.strength > 0;
  return (
    <div className="flex flex-col">
      <Block variant="light">
        <Title>3. Select your class</Title>
        <div className="flex justify-center gap-8">
        </div>
      </Block>
      <div className="self-center">
        <Button2 disabled={!done} onClick={onConfirm}>Confirm</Button2>
      </div>
    </div>
  );
}
