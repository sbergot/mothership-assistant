import { useState } from "react";
import { Block, Button2, Title } from "../Atoms";
import { allSaves } from "../Data/data";
import { Rating } from "../Molecules";
import { roll } from "../Services/diceServices";
import { StepProps } from "./types";

export function RollSaves({ character, onConfirm }: StepProps) {
  const [newCharacter, setCharacter] = useState({ ...character });
  const done = newCharacter.sanity > 0;

  function rollSaves(): void {
    let newChar = character;
    allSaves.forEach((save) => {
      newChar = { ...newChar, [save]: roll(10, 2) + 10 };
    });
    setCharacter(newChar);
  }

  return (
    <div className="flex flex-col">
      <Block variant="light">
        <Title>1. Roll 2d10 + 10 for each stat</Title>
        <div className="flex justify-center gap-8">
          <Rating title="Sanity" value={newCharacter.sanity} />
          <Rating title="Fear" value={newCharacter.fear} />
          <Rating title="Body" value={newCharacter.body} />
        </div>
      </Block>
      <div className="self-center">
        <Button2 disabled={done} onClick={rollSaves}>
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
