import { Entry } from "BaseTypes";
import { useState } from "react";
import { RootModes } from "Root/types";
import { Character, Game } from "Rules/types";
import { Block, Button, DividerOr, Title } from "UI/Atoms";

interface Props {
  characterEntries: Entry<Character>[];
  deleteCharacterEntry(c: Entry<Character>): void;
  gameEntries: Entry<Game>[];
  deleteGameEntry(c: Entry<Game>): void;
  setMode(mode: RootModes): void;
}

export function MainMenu({
  characterEntries,
  deleteCharacterEntry,
  gameEntries,
  deleteGameEntry,
  setMode,
}: Props) {
  const [sessionCode, setSessionCode] = useState<string>();
  return (
    <div className="flex gap-2">
      <div className="flex flex-col gap-2 max-w-lg w-full">
        <Title>Characters</Title>
        {characterEntries.map((c) => (
          <Block key={c.id} variant="light">
            <div>{c.value.name}</div>
            <Button
              onClick={() =>
                setMode({ mode: "Play", characterId: c.id, sessionCode: "" })
              }
            >
              open
            </Button>
            <Button onClick={() => deleteCharacterEntry(c)}>remove</Button>
          </Block>
        ))}
        <Block variant="light">
          <Button onClick={() => setMode({ mode: "CreateCharacter" })}>
            Create character
          </Button>
        </Block>
      </div>
      <div className="max-w-lg w-full">
        <Title>Games</Title>
        <Button dark onClick={() => {}}>
          Join session
        </Button>
        <input
          value={sessionCode}
          onChange={(e) => setSessionCode(e.target.value)}
        />
        <DividerOr />
        <Title>Start a session from a game</Title>
        {gameEntries.map((c) => (
          <Block key={c.id} variant="light">
            <div>{c.value.title}</div>
            <Button
              onClick={() =>
                setMode({ mode: "Play", characterId: c.id, sessionCode: "" })
              }
            >
              open
            </Button>
            <Button onClick={() => deleteGameEntry(c)}>remove</Button>
          </Block>
        ))}
        <Block variant="light">
          <Button onClick={() => setMode({ mode: "CreateCharacter" })}>
            New game
          </Button>
        </Block>
      </div>
    </div>
  );
}
