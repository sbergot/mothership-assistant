import { useState } from "react";
import { Block, Button2, Title } from "../Atoms";
import { allStats } from "../Data/data";
import { Rating } from "../Molecules";
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
        <Title>8. Roll for your equipment trinket, patch & loadout </Title>
        <div className="flex justify-center gap-8">
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
