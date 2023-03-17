import { Block, Divider, Title } from "UI/Atoms";
import { Rating } from "UI/Molecules";
import { ReadCharacter } from "./types";

export function ContractorStats({ character }: ReadCharacter) {
  return (
    <Block variant="light">
      <Title>Stats</Title>
      <div className="flex justify-center gap-8">
        <Rating title="Strength" value={character.strength} />
        <Rating title="Speed" value={character.speed} />
        <Rating title="Intellect" value={character.intellect} />
        <Rating title="Combat" value={character.combat} />
      </div>
      <Divider />
      <Title>Saves</Title>
      <div className="flex justify-center gap-8">
        <Rating title="Sanity" value={character.sanity} />
        <Rating title="Fear" value={character.fear} />
        <Rating title="Body" value={character.body} />
      </div>
    </Block>
  );
}
