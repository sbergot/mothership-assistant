import { CharacterCreation } from "CharacterCreation/CharacterCreation";
import { CharacterSheet } from "CharacterSheet";
import { useState } from "react";
import { Character } from "Rules/types";
import { createRepository } from "Services/services";
import { Session } from "Session/Session";
import { Block, Button } from "UI/Atoms";

const useCharacterRepo = createRepository<Character>("characters");

interface ViewCharacterMode {
  mode: "ViewCharacter";
  characterId: string;
}

interface CreateCharacterMode {
  mode: "CreateCharacter";
}

interface MainMenuMode {
  mode: "MainMenu";
}

type Modes = ViewCharacterMode | CreateCharacterMode | MainMenuMode;

export function MainMenu() {
  const { saveNew, update, deleteEntry, getEntries, getEntry } =
    useCharacterRepo();
  const [mode, setMode] = useState<Modes>({ mode: "MainMenu" });
  const entries = getEntries();

  if (mode.mode === "MainMenu") {
    return (
      <div className="flex flex-col gap-2">
        {entries.map((c) => (
          <Block key={c.id} variant="light">
            <div>{c.value.name}</div>
            <Button
              onClick={() => setMode({ mode: "ViewCharacter", characterId: c.id })}
            >
              open
            </Button>
            <Button onClick={() => deleteEntry(c)}>remove</Button>
          </Block>
        ))}
        <Block variant="light">
          <Button onClick={() => setMode({ mode: "CreateCharacter" })}>
            Create character
          </Button>
        </Block>
      </div>
    );
  }

  if (mode.mode === "CreateCharacter") {
    return (
      <CharacterCreation
        onComplete={(c) => {
          saveNew(c);
          setMode({ mode: "MainMenu" });
        }}
      />
    );
  }

  if (mode.mode === "ViewCharacter") {
    return (
      <Session
        character={getEntry(mode.characterId)}
        setCharacter={(setter) => update(mode.characterId, setter)}
      />
    );
  }

  return <div>Error</div>;
}
