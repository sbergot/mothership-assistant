import { Character, Game } from "Rules/types";
import { Title } from "UI/Atoms";
import { CharacterShort } from "UI/Organisms/CharacterShort";
import { ContractorShort } from "UI/Organisms/ContractorShort";
import { MonsterShort } from "UI/Organisms/MonsterShort";
import { NpcShort } from "UI/Organisms/NpcShort";

interface Props {
  game: Game;
  characters: Character[];
}

export function DmSheet({ game, characters }: Props) {
  const { npcs, monsters } = game;
  const contractors = characters.flatMap((c) => c.contractors);
  return (
    <div>
      <Title>Characters</Title>
      <div className="flex flex-col gap-2">
        {characters.map((c) => (
          <CharacterShort character={c} onTitleClick={() => {}} />
        ))}
      </div>
      <Title>Contractors</Title>
      {contractors.map((c) => (
        <ContractorShort contractor={c} onTitleClick={() => {}} />
      ))}
      <Title>Npcs</Title>
      {npcs.map((c) => (
        <NpcShort npc={c} onTitleClick={() => {}} />
      ))}
      <Title>Monsters</Title>
      {monsters.map((c) => (
        <MonsterShort monster={c} onTitleClick={() => {}} />
      ))}
    </div>
  );
}
