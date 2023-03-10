import { Block, Title } from "UI/Atoms";
import { Rating } from "UI/Molecules";
import { ReadCharacter } from "./types";

export function Saves({ character }: ReadCharacter) {
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
