import { useState } from "react";
import { Block, Button2, Title } from "../UI/Atoms";
import { allStats } from "../Rules/data";
import { Rating } from "../UI/Molecules";
import { roll } from "../Services/diceServices";
import { StepProps } from "./types";

export function RollStats({ character, onConfirm }: StepProps) {
  const [newCharacter, setCharacter] = useState({ ...character });
  const done = newCharacter.strength > 0;

  function rollStats(): void {
    let newChar = character;
    allStats.forEach((save) => {
      newChar = { ...newChar, [save]: roll(10, 2) + 25 };
    });
    setCharacter(newChar);
  }

  return (
    <div className="flex flex-col">
      <Block variant="light">
        <Title>1. Roll 2d10 + 25 for each stat</Title>
        <div className="flex justify-center gap-8">
          <Rating title="Strength" value={newCharacter.strength} />
          <Rating title="Speed" value={newCharacter.speed} />
          <Rating title="Intellect" value={newCharacter.intellect} />
          <Rating title="Combat" value={newCharacter.combat} />
        </div>
      </Block>
      <div className="self-center">
        <Button2 disabled={done} onClick={rollStats}>
          Roll
        </Button2>
      </div>
      <div className="self-center">
        <Button2 disabled={!done} onClick={() => onConfirm(newCharacter)}>
          Confirm
        </Button2>
      </div>
    </div>
  );
}
