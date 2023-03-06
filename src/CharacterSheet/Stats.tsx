import { Block, Title } from "../UI/Atoms";
import { Rating } from "../UI/Molecules";
import { Character } from "../Rules/types";

interface Props {
  character: Character;
}

export function Stats({ character }: Props) {
  return (
    <Block variant="light">
      <Title>Stats</Title>
      <div className="flex justify-center gap-8">
        <Rating title="Strength" value={character.strength} />
        <Rating title="Speed" value={character.speed} />
        <Rating title="Intellect" value={character.intellect} />
        <Rating title="Combat" value={character.combat} />
      </div>
    </Block>
  );
}
