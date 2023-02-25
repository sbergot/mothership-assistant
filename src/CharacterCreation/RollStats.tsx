import { Block, Button, Button2, Title } from "../Atoms";
import { Rating } from "../Molecules";
import { Character, Updater } from "../types";

interface Props {
  character: Character;
  setCharacter: Updater;
}

export function RollStats({ character }: Props) {
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
        <Button2>Roll</Button2>
      </div>
    </div>
  );
}
