import { Character, Game, Monster, Npc } from "Rules/types";
import { uuidv4 } from "Services/services";
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

function newNpc(): Npc {
  return {
    combat: 0,
    instinct: 0,
    maxWounds: 2,
    wounds: 0,
    name: "name",
    id: uuidv4(),
  };
}

function newMonster(): Monster {
  return {
    combat: 0,
    instinct: 0,
    maxWounds: 2,
    wounds: 0,
    name: "name",
    id: uuidv4(),
    health: 10,
    maxHealth: 10
  };
}

export function DmSheet({ game, setGame, characters }: Props) {
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
      <div className="flex flex-col items-center gap-2 mb-8">
        {npcs.map((c) => (
          <NpcShort key={c.id} npc={c} onTitleClick={() => {}} />
        ))}
        <div>
          <Button
            onClick={() => {
              setGame((g) => ({
                ...g,
                npcs: [...g.npcs, newNpc()],
              }));
            }}
          >
            New Npc
          </Button>
        </div>
      </div>
      <Title>Monsters</Title>
      <div className="flex flex-col items-center gap-2 mb-8">
        {monsters.map((c) => (
          <MonsterShort key={c.id} monster={c} onTitleClick={() => {}} />
        ))}
        <div>
          <Button
            onClick={() => {
              setGame((g) => ({
                ...g,
                monsters: [...g.monsters, newMonster()],
              }));
            }}
          >
            New Monster
          </Button>
        </div>
      </div>
    </div>
  );
}
