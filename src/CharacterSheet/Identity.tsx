import { Block } from "../Atoms";
import { Character } from "../types";

interface Props {
  character: Character;
}

export function Identity({ character }: Props) {
  return (
    <Block variant="dark">
      <div>
        <label>Character Name</label>
        <input className="input" id="characterClass" value={character.name} />
      </div>
      <div>
        <label>Pronouns</label>
        <input className="input" value={character.pronouns} />
      </div>
      <div>
        <label>Class</label>
        <select className="input" value={character.characterClass}>
          <option value="marine">Marine</option>
          <option value="teamster">Teamster</option>
          <option value="android">Android</option>
          <option value="scientist">Scientist</option>
        </select>
      </div>
      <div>
        <label>High score</label>
        <input className="input" type="number" value={character.highScore} />
      </div>
    </Block>
  );
}
