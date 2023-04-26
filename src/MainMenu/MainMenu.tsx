import { Entry } from "BaseTypes";
import { useState } from "react";
import { RootModes } from "Root/types";
import { Character, Game } from "Rules/types";
import { uuidv4 } from "Services/storageServices";
import { Block, Button, DividerOr, Title } from "UI/Atoms";
import { DangerIcon } from "UI/Icons";

function download(filename: string, text: string) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

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
  const [sessionCode, setSessionCode] = useState<string>("");
  const [selectedCharId, setSelectedCharId] = useState<string | null>(null);
  const [confirmCharDeletion, setConfirmCharDeletion] = useState(false);
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
  const [confirmGameDeletion, setConfirmGameDeletion] = useState(false);
  const [newGameName, setNewGameName] = useState("");
  const [charFileInputKey, setCharFileInputKey] = useState(uuidv4());

  return (
    <div className="flex flex-wrap gap-2">
      <div className="flex flex-col gap-2 max-w-lg w-full">
        <Title>Characters</Title>
        {characterEntries.map((c) => (
          <Button
            key={c.id}
            onClick={() => {
              setSelectedCharId(c.id);
              setConfirmCharDeletion(false);
            }}
            light={selectedCharId !== c.id}
          >
            {c.value.name}
          </Button>
        ))}
        <Block variant="light">
          <div className="flex flex-wrap gap-2">
            <div className="shrink-0">
              <Button onClick={() => setMode({ mode: "CreateCharacter" })}>
                Create character
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
              <Button
                disabled={selectedCharId === null}
                onClick={() => {
                  if (confirmCharDeletion) {
                    deleteCharacterEntry(
                      characterEntries.find((c) => c.id === selectedCharId)!
                    );
                    setConfirmCharDeletion(false);
                  } else {
                    setConfirmCharDeletion(true);
                  }
                }}
              >
                {confirmCharDeletion ? (
                  <span>
                    <DangerIcon />
                    Confirm deletion?
                  </span>
                ) : (
                  <span>Remove character</span>
                )}
              </Button>
            </div>
            <div className="shrink-0">
              <Button
                onClick={() => {
                  download(
                    "mothership-assistant-characters.json",
                    localStorage["characters"]
                  );
                }}
              >
                export
              </Button>
            </div>
            <div className="shrink-0">
              <input
                type="file"
                key={charFileInputKey}
                onChange={(event) => {
                  var file = event.target.files![0];
                  var reader = new FileReader();
                  reader.onload = function (readerevent) {
                    const fileContent: string = readerevent.target!
                      .result as string;
                    localStorage["characters"] = fileContent;
                    setCharFileInputKey(uuidv4());
                  };

                  reader.readAsText(file);
                }}
              />
              <Button onClick={() => {}}>import</Button>
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
            <Button
              dark
              onClick={() => {
                setMode({
                  mode: "PlayerSession",
                  sessionCode,
                  characterId: selectedCharId!,
                });
              }}
              disabled={
                selectedCharId === null ||
                !sessionCode ||
                sessionCode.length === 0
              }
            >
              Join session
            </Button>
          </div>
        </div>
        <DividerOr />
        <Title>Start a session from a game</Title>
        {gameEntries.map((c) => (
          <Button
            key={c.id}
            onClick={() => {
              setSelectedGameId(c.id);
              setConfirmGameDeletion(false);
            }}
            light={selectedGameId !== c.id}
          >
            {c.value.title}
          </Button>
        ))}
        <Block variant="light">
          <div className="flex items-center gap-2">
            <div className="shrink-0">
              <Button
                onClick={() => {
                  const newId = saveNewGame({
                    monsters: [],
                    npcs: [],
                    messages: [],
                    title: newGameName,
                  });
                  setMode({ mode: "DmSession", gameId: newId });
                }}
              >
                New game
              </Button>
            </div>
            <input
              className="input border-2 border-mother-5"
              placeholder="name"
              value={newGameName}
              onChange={(e) => setNewGameName(e.target.value)}
            />
          </div>
          <div className="flex gap-2 mt-2">
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
              onClick={() => {
                if (confirmGameDeletion) {
                  deleteGameEntry(
                    gameEntries.find((g) => g.id === selectedGameId)!
                  );
                  setConfirmGameDeletion(false);
                } else {
                  setConfirmGameDeletion(true);
                }
              }}
            >
              {confirmGameDeletion ? (
                <span>
                  <DangerIcon />
                  Confirm deletion?
                </span>
              ) : (
                <span>Delete game</span>
              )}
            </Button>
          </div>
        </Block>
      </div>
    </div>
  );
}
