import { Block, Title } from "../Atoms";
import { Rating } from "../Molecules";
import { Character } from "../types";

interface Props {
  character: Character;
}

export function Saves({ character }: Props) {
  return (
    <Block variant="light">
      <Title>Saves</Title>
      <div className="flex justify-center gap-8">
        <Rating title="Sanity" value={character.sanity} />
        <Rating title="Fear" value={character.fear} />
        <Rating title="Body" value={character.body} />
      </div>
    </Block>
  );
}
