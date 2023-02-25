import { Block, Button2, Title } from "../Atoms";
import { allSaves } from "../Data/data";
import { Rating } from "../Molecules";
import { roll } from "../Services/diceServices";
import { Character } from "../types";
import { StepProps } from "./types";

function rollSaves(character: Character): Character {
  let newChar = character;
  allSaves.forEach((save) => {
    newChar = { ...newChar, [save]: roll(10, 2) + 10 };
  });
  return newChar;
}

export function RollSaves({ character, setCharacter, onConfirm }: StepProps) {
  const done = character.sanity > 0;
  return (
    <div className="flex flex-col">
      <Block variant="light">
        <Title>1. Roll 2d10 + 10 for each stat</Title>
        <div className="flex justify-center gap-8">
          <Rating title="Sanity" value={character.sanity} />
          <Rating title="Fear" value={character.fear} />
          <Rating title="Body" value={character.body} />
        </div>
      </Block>
      <div className="self-center">
        <Button2 disabled={done} onClick={() => setCharacter(rollSaves)}>Roll</Button2>
      </div>
      <div className="self-center">
        <Button2 disabled={!done} onClick={onConfirm}>Confirm</Button2>
      </div>
    </div>
  );
}
