import { CharacterCreation } from "CharacterCreation/CharacterCreation";
import { CharacterSheet } from "CharacterSheet";
import { useState } from "react";
import { Character } from "Rules/types";
import { createRepository } from "Services/services";
import { Block, Button } from "UI/Atoms";

const useCharacterRepo = createRepository<Character>("characters");

interface ViewCharacterMode {
  mode: "ViewCharacter";
  id: string;
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
              onClick={() => setMode({ mode: "ViewCharacter", id: c.id })}
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
      <CharacterSheet
        character={getEntry(mode.id)}
        setCharacter={(setter) => update(mode.id, setter)}
      />
    );
  }

  return <div>Error</div>;
}
