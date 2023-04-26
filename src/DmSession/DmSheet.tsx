import { Character, Game } from "Rules/types";
import { Title } from "UI/Atoms";
import { CharacterShort } from "UI/Organisms/CharacterShort";
import { ContractorShort } from "UI/Organisms/ContractorShort";
import { Monsters } from "./Monsters";
import { NPCs } from "./NPCs";

interface Props {
  game: Game;
  setGame(setter: (c: Game) => Game): void;
  characters: Character[];
}

export function DmSheet({ game, setGame, characters }: Props) {
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
      <Monsters game={game} setGame={setGame} />
      <NPCs game={game} setGame={setGame} />
    </div>
  );
}
