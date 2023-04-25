import { Block, Button, Divider, Title } from "UI/Atoms";
import { Rating } from "UI/Molecules";
import { ReadWriteCharacter } from "./types";

interface Props extends ReadWriteCharacter {
  back(): void;
}

export function EditStats({ character, setCharacter, back }: Props) {
  return (
    <>
      <Block variant="light">
        <Title>Stats</Title>
        <div className="flex flex-wrap justify-center gap-8">
          <Rating
            title="Strength"
            value={character.strength}
            onUpdate={(x) => setCharacter((char) => ({ ...char, strength: x }))}
          />
          <Rating
            title="Speed"
            value={character.speed}
            onUpdate={(x) => setCharacter((char) => ({ ...char, speed: x }))}
          />
          <Rating
            title="Intellect"
            value={character.intellect}
            onUpdate={(x) =>
              setCharacter((char) => ({ ...char, intellect: x }))
            }
          />
          <Rating
            title="Combat"
            value={character.combat}
            onUpdate={(x) => setCharacter((char) => ({ ...char, combat: x }))}
          />
        </div>
        <Divider />
        <Title>Saves</Title>
        <div className="flex justify-center gap-8">
          <Rating
            title="Sanity"
            value={character.sanity}
            onUpdate={(x) => setCharacter((char) => ({ ...char, sanity: x }))}
          />
          <Rating
            title="Fear"
            value={character.fear}
            onUpdate={(x) => setCharacter((char) => ({ ...char, fear: x }))}
          />
          <Rating
            title="Body"
            value={character.body}
            onUpdate={(x) => setCharacter((char) => ({ ...char, body: x }))}
          />
        </div>
      </Block>
      <div className="flex justify-center mt-2">
        <Button onClick={back} dark>Back</Button>
      </div>
    </>
  );
}
