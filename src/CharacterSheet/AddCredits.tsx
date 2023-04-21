import { Block, Button, Title } from "UI/Atoms";
import { ReadWriteCharacter } from "./types";
import { Character } from "Rules/types";

interface Props extends ReadWriteCharacter {
  back(): void;
}

export function AddCredits({ character, setCharacter, back }: Props) {
  return (
    <>
      <Block variant="light">
        <Title>Credits</Title>
        <input
          className="input"
          type="number"
          value={character.credits}
          onChange={(e) =>
            setCharacter((c: Character) => ({
              ...c,
              credits: parseInt(e.target.value),
            }))
          }
        />       
      </Block>
      <div className="flex justify-center mt-2">
        <Button onClick={back} dark>Back</Button>
      </div>
    </>
  );
}
