import { useState } from "react";
import { Block, Button, Title } from "UI/Atoms";
import { StepProps } from "./types";

export function PersonalDetails({ character, onConfirm }: StepProps) {
  const [newCharacter, setCharacter] = useState({ ...character });
  const done = newCharacter.name && newCharacter.pronouns;
  return (
    <div className="flex flex-col">
      <Block variant="dark">
        <Title variant="light">9. Personal details</Title>
        <div>
          <label>Character Name*</label>
          <input
            className="input"
            id="characterClass"
            value={newCharacter.name}
            onChange={(e) =>
              setCharacter((c) => ({ ...c, name: e.target.value }))
            }
          />
        </div>
        <div>
          <label>Pronouns*</label>
          <input
            className="input"
            value={newCharacter.pronouns}
            onChange={(e) =>
              setCharacter((c) => ({ ...c, pronouns: e.target.value }))
            }
          />
        </div>
        <div>
          <label>Personal notes</label>
          <input
            className="input"
            value={newCharacter.personalNotes}
            onChange={(e) =>
              setCharacter((c) => ({ ...c, personalNotes: e.target.value }))
            }
          />
        </div>
      </Block>
      <div className="self-center mt-2">
        <Button rounded dark disabled={!done} onClick={() => onConfirm(newCharacter)}>
          Confirm
        </Button>
      </div>
    </div>
  );
}
