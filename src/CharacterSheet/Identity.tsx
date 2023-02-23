import { Block } from "../Atoms";

export function Identity() {
  return (
    <Block variant="dark">
      <div>
        <label>Character Name</label>
        <input className="input" id="characterClass" />
      </div>
      <div>
        <label>Pronouns</label>
        <input className="input" />
      </div>
      <div>
        <label>Class</label>
        <select className="input">
        <option value="marine">Marine</option>
        <option value="teamster">Teamster</option>
        <option value="android">Android</option>
        <option value="scientist">Scientist</option>
        </select>
      </div>
      <div>
        <label>High score</label>
        <input className="input" type='number' />
      </div>
    </Block>
  );
}
