import { Block, Button, Divider, Title } from "UI/Atoms";
import { Rating } from "UI/Molecules";
import { ReadCharacter, SetMode } from "./types";

export function Stats({ character, setMode }: ReadCharacter & SetMode) {
  return (
    <Block variant="light">
      <Title>Stats</Title>
      <div className="flex justify-around max-w-md mx-auto">
        <Rating title="Strength" value={character.strength} />
        <Rating title="Speed" value={character.speed} />
        <Rating title="Intellect" value={character.intellect} />
        <Rating title="Combat" value={character.combat} />
      </div>
      <Divider />
      <Title>Saves</Title>
      <div className="flex justify-around max-w-md mx-auto">
        <Rating title="Sanity" value={character.sanity} />
        <Rating title="Fear" value={character.fear} />
        <Rating title="Body" value={character.body} />
      </div>
      <div className="flex flex-wrap justify-center mt-2">
        <Button onClick={() => setMode({ mode: "EditStats" })} dark>
          Edit
        </Button>
        <Button onClick={() => setMode({ mode: "RollStat" })} dark>
          Stat check
        </Button>
        <Button onClick={() => setMode({ mode: "RollSave" })} dark>
          Save check
        </Button>
        <Button onClick={() => setMode({ mode: "RollRest" })} dark>
          Rest check
        </Button>
      </div>
    </Block>
  );
}
