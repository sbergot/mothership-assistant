import { Character, Game } from "Rules/types";
import { Button, Title } from "UI/Atoms";
import { CharacterShort } from "UI/Organisms/CharacterShort";
import { ContractorShort } from "UI/Organisms/ContractorShort";
import { Monsters } from "./Monsters";
import { NPCs } from "./NPCs";
import { ReadWriteGame } from "./types";
import { CustomEntries } from "./CustomEntries";

interface Props extends ReadWriteGame {
  characters: Character[];
  updateRevealedElements(c: Game): void;
}

export function DmSheet({
  game,
  setGame,
  characters,
  updateRevealedElements,
}: Props) {
  const contractors = characters.flatMap((c) => c.contractors);
  function setGameAndUpdate(setter: (c: Game) => Game) {
    function newSetter(c: Game): Game {
      const newGame = setter(c);
      updateRevealedElements(newGame);
      return newGame;
    }
    setGame(newSetter);
  }
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
      <Monsters game={game} setGame={setGameAndUpdate} />
      <NPCs game={game} setGame={setGameAndUpdate} />
      <CustomEntries game={game} setGame={setGameAndUpdate} />
    </div>
  );
}
