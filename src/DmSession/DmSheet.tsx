import { deleteInList, updateInList } from "helpers";
import { useState } from "react";
import { Character, Game, Monster, Npc } from "Rules/types";
import { uuidv4 } from "Services/storageServices";
import { Button, Title } from "UI/Atoms";
import { CharacterShort } from "UI/Organisms/CharacterShort";
import { ContractorShort } from "UI/Organisms/ContractorShort";
import { MonsterShort } from "UI/Organisms/MonsterShort";
import { NpcShort } from "UI/Organisms/NpcShort";

interface Props {
  game: Game;
  setGame(setter: (c: Game) => Game): void;
  characters: Character[];
}

function newNpc(name: string): Npc {
  return {
    combat: 0,
    instinct: 0,
    maxWounds: 2,
    wounds: 0,
    name,
    id: uuidv4(),
  };
}

function newMonster(name: string): Monster {
  return {
    combat: 0,
    instinct: 0,
    maxWounds: 2,
    wounds: 0,
    name,
    id: uuidv4(),
    health: 10,
    maxHealth: 10,
  };
}

export function DmSheet({ game, setGame, characters }: Props) {
  const [newNpcName, setNewNpcName] = useState("");
  const [newMonsterName, setNewMonsterName] = useState("");
  const { npcs, monsters } = game;
  const contractors = characters.flatMap((c) => c.contractors);
  return (
    <div>
      <Title>Characters</Title>
      <div className="flex flex-col gap-2 mb-8">
        {characters.map((c) => (
          <CharacterShort key={c.id} character={c} onTitleClick={() => {}} />
        ))}
      </div>
      <Title>Contractors</Title>
      <div className="flex flex-col gap-2 mb-8">
        {contractors.map((c) => (
          <ContractorShort key={c.id} contractor={c} onTitleClick={() => {}} />
        ))}
      </div>
      <Title>Npcs</Title>
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {npcs.map((c) => (
          <NpcShort
            key={c.id}
            npc={c}
            setNpc={(setter) => {
              setGame((g) => ({
                ...g,
                npcs: updateInList(g.npcs, c.id, setter),
              }));
            }}
            deleteNpc={() => {
              setGame((g) => ({
                ...g,
                npcs: deleteInList(g.npcs, c.id),
              }));
            }}
          />
        ))}
      </div>
      <div className="flex items-center gap-2">
        <div className="shrink-0">
          <Button
            onClick={() => {
              setGame((g) => ({
                ...g,
                npcs: [...g.npcs, newNpc(newNpcName)],
              }));
              setNewNpcName("");
            }}
          >
            New Npc
          </Button>
        </div>
        <input
          className="input border-2 border-mother-5"
          placeholder="name"
          value={newNpcName}
          onChange={(e) => setNewNpcName(e.target.value)}
        />
      </div>
      <Title>Monsters</Title>
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
          />
        ))}
      </div>
      <div className="flex items-center gap-2">
        <div className="shrink-0">
          <Button
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
    </div>
  );
}
