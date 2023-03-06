import { Block } from "UI/Atoms";
import { Character } from "Rules/types";

interface Props {
  character: Character;
  setCharacter(setter: (c: Character) => Character): void;
}

export function Identity({ character, setCharacter }: Props) {
  return (
    <Block variant="dark">
      <div>
        <label>Character Name</label>
        <Block variant="bright" small>{character.name}</Block>
      </div>
      <div>
        <label>Pronouns</label>
        <Block variant="bright" small>{character.pronouns}</Block>
      </div>
      <div>
        <label>Class</label>
        <Block variant="bright" small>{character.characterClass}</Block>
      </div>
      <div>
        <label>High score</label>
        <input className="input" type="number" value={character.highScore} onChange={(e) => setCharacter((c: Character) => ({...c, highScore: parseInt(e.target.value)}))} />
      </div>
    </Block>
  );
}
