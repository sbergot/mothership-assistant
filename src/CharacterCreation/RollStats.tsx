import { Block, Button, Button2, Title } from "../Atoms";
import { allStats } from "../Data/data";
import { Rating } from "../Molecules";
import { roll } from "../Services/diceServices";
import { Character, Updater } from "../types";
import { StepProps } from "./types";

function rollStats(character: Character): Character {
  let newChar = character;
  allStats.forEach(stat => {
    newChar = {...newChar, [stat]: roll(10, 2) + 25}
  });
  return newChar;
}

export function RollStats({ character, setCharacter, onConfirm }: StepProps) {
  const done = character.strength > 0;
  return (
    <div className="flex flex-col">
      <Block variant="light">
        <Title>1. Roll 2d10 + 25 for each stat</Title>
        <div className="flex justify-center gap-8">
          <Rating title="Strength" value={character.strength} />
          <Rating title="Speed" value={character.speed} />
          <Rating title="Intellect" value={character.intellect} />
          <Rating title="Combat" value={character.combat} />
        </div>
      </Block>
      <div className="self-center">
        <Button2 disabled={done} onClick={() => setCharacter(rollStats)}>Roll</Button2>
      </div>
      <div className="self-center">
        <Button2 disabled={!done} onClick={onConfirm}>Confirm</Button2>
      </div>
    </div>
  );
}
