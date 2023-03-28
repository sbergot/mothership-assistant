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
  saveNewGame(game: Game): string;
  setMode(mode: RootModes): void;
}

export function MainMenu({
  characterEntries,
  deleteCharacterEntry,
  gameEntries,
  deleteGameEntry,
  saveNewGame,
  setMode,
}: Props) {
  const [sessionCode, setSessionCode] = useState<string>();
  const [selectedCharId, setSelectedCharId] = useState<string | null>(null);
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
  return (
    <div className="flex gap-2">
      <div className="flex flex-col gap-2 max-w-lg w-full">
        <Title>Characters</Title>
        {characterEntries.map((c) => (
          <Button
            key={c.id}
            onClick={() => setSelectedCharId(c.id)}
            light={selectedCharId !== c.id}
          >
            {c.value.name}
          </Button>
        ))}
        <Block variant="light">
          <div className="flex flex-wrap gap-2">
            <div className="shrink-0">
              <Button
                disabled={selectedCharId === null}
                onClick={() =>
                  deleteCharacterEntry(
                    characterEntries.find((c) => c.id === selectedCharId)!
                  )
                }
              >
                Remove character
              </Button>
            </div>
            <div className="shrink-0">
              <Button
                disabled={selectedCharId === null}
                onClick={() =>
                  setMode({
                    mode: "PlayerSession",
                    characterId: selectedCharId!,
                    sessionCode: "",
                  })
                }
              >
                Solo session
              </Button>
            </div>
            <div className="shrink-0">
              <Button onClick={() => setMode({ mode: "CreateCharacter" })}>
                Create character
              </Button>
            </div>
          </div>
        </Block>
      </div>
      <div className="flex flex-col gap-2 max-w-lg w-full">
        <Title>Games</Title>
        <div className="flex items-center gap-2">
          <input
            className="input border-2 border-mother-5"
            placeholder="Session code"
            value={sessionCode}
            onChange={(e) => setSessionCode(e.target.value)}
          />
          <div className="shrink-0">
            <Button dark onClick={() => {}} disabled={selectedCharId === null}>
              Join session
            </Button>
          </div>
        </div>
        <DividerOr />
        <Title>Start a session from a game</Title>
        {gameEntries.map((c) => (
          <Button
            key={c.id}
            onClick={() => setSelectedGameId(c.id)}
            light={selectedCharId !== c.id}
          >
            {c.value.title}
          </Button>
        ))}
        <Block variant="light">
          <Button
            onClick={() => {
              const newId = saveNewGame({
                monsters: [],
                npcs: [],
                title: "game title",
              });
              setMode({ mode: "DmSession", gameId: newId });
            }}
          >
            New game
          </Button>
          <Button
            disabled={selectedGameId === null}
            onClick={() =>
              setMode({ mode: "DmSession", gameId: selectedGameId! })
            }
          >
            Resume game
          </Button>
          <Button
            disabled={selectedGameId === null}
            onClick={() =>
              deleteGameEntry(gameEntries.find(g => g.id === selectedGameId)!)
            }
          >
            Delete game
          </Button>
        </Block>
      </div>
    </div>
  );
}
