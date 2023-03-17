import { Block } from "UI/Atoms";
import { Character } from "Rules/types";
import { ReadWriteCharacter } from "./types";
import { StringProperties } from "BaseTypes";

function Field({
  character,
  setCharacter,
  field,
}: ReadWriteCharacter & { field: StringProperties<Character> }) {
  return (
    <Block variant="bright" small>
      <input
        value={character[field]}
        onChange={(e) =>
          setCharacter((char) => ({ ...char, [field]: e.target.value }))
        }
      />
    </Block>
  );
}

export function Identity({ character, setCharacter }: ReadWriteCharacter) {
  return (
    <Block variant="dark">
      <div>
        <label>Character Name</label>
        <Field character={character} setCharacter={setCharacter} field="name" />
      </div>
      <div>
        <label>Pronouns</label>
        <Field
          character={character}
          setCharacter={setCharacter}
          field="pronouns"
        />
      </div>
      <div>
        <label>Class</label>
        <Block variant="bright" small>
          {character.characterClass}
        </Block>
      </div>
      <div>
        <label>High score</label>
        <input
          className="input"
          type="number"
          value={character.highScore}
          onChange={(e) =>
            setCharacter((c: Character) => ({
              ...c,
              highScore: parseInt(e.target.value),
            }))
          }
        />
      </div>
    </Block>
  );
}
