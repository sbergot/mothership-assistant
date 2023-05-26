import { Button } from "UI/Atoms";
import { MonsterShort } from "UI/Organisms/MonsterShort";
import { updateInList, deleteInList } from "helpers";
import { useState } from "react";
import { ReadWriteGame, SetDmMode } from "./types";
import { Monster } from "Rules/types";
import { uuidv4 } from "Services/storageServices";
import { Log } from "Messages/types";

export function Monsters({
  game,
  setGame,
  setMode,
  log,
}: ReadWriteGame & SetDmMode & Log) {
  const [newMonsterName, setNewMonsterName] = useState("");
  const { monsters } = game;

  function newMonster(name: string): Monster {
    return {
      combat: 0,
      instinct: 0,
      maxWounds: 2,
      wounds: 0,
      name,
      description: "",
      visibleToAll: false,
      id: uuidv4(),
      health: 10,
      maxHealth: 10,
      excluded: false,
      attacks: [],
    };
  }

  return (
    <>
      <div className="flex flex-col items-center gap-2 mb-8">
        {monsters.map((c) => (
          <MonsterShort
            key={c.id}
            monster={c}
            setMonster={(setter) => {
              setGame((g) => ({
                ...g,
                monsters: updateInList(g.monsters, c.id, setter),
              }));
            }}
            deleteMonster={() => {
              setGame((g) => ({
                ...g,
                monsters: deleteInList(g.monsters, c.id),
              }));
            }}
            setMode={setMode}
            log={log}
          />
        ))}
      </div>
      <div className="flex items-center gap-2">
        <div className="shrink-0">
          <Button
            disabled={newMonsterName.replace(/\s/g, "") === ""}
            onClick={() => {
              setGame((g) => ({
                ...g,
                monsters: [...g.monsters, newMonster(newMonsterName)],
              }));
              setNewMonsterName("");
            }}
          >
            New Monster
          </Button>
        </div>
        <input
          className="input border-2 border-mother-5"
          placeholder="name"
          value={newMonsterName}
          onChange={(e) => setNewMonsterName(e.target.value)}
        />
      </div>
    </>
  );
}
