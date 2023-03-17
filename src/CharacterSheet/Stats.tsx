import { Block, Button, Divider, Title } from "UI/Atoms";
import { Rating } from "UI/Molecules";
import { ReadCharacter, SetMode } from "./types";

export function Stats({ character, setMode }: ReadCharacter & SetMode) {
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
      <div className="flex justify-center mt-2">
        <Button onClick={() => setMode({ mode: "EditStats" })} dark>Edit</Button>
      </div>
    </Block>
  );
}
