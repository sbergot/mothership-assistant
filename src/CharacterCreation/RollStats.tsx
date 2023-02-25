import { Block, Title } from "../Atoms";
import { Rating } from "../Molecules";

export function RollStats() {
    <Block variant="light">
        <Title>1. Roll 2d10 + 25 for each stat</Title>
        <div className="flex justify-center gap-8">
        <Rating title="Strength" value={character.strength} />
        <Rating title="Speed" value={character.speed} />
        <Rating title="Intellect" value={character.intellect} />
        <Rating title="Combat" value={character.combat} />
      </div>
    </Block>
}
