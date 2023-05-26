import { Character, Game } from "Rules/types";
import { Button, Title } from "UI/Atoms";
import { CharacterShort } from "UI/Organisms/CharacterShort";
import { ContractorShort } from "UI/Organisms/ContractorShort";
import { Monsters } from "./Monsters";
import { NPCs } from "./NPCs";
import { ReadWriteGame, SetDmMode } from "./types";
import { CustomEntries } from "./CustomEntries";
import { FoldableSection } from "UI/Molecules";
import { Log } from "Messages/types";

interface Props extends ReadWriteGame, SetDmMode, Log {
  characters: Character[];
}

export function DmSheet({
  game,
  setGame,
  characters,
  setMode,
  log
}: Props) {
  const contractors = characters.flatMap((c) => c.contractors);
  return (
    <div>
      <FoldableSection title="Characters">
        <div className="flex flex-col gap-2 mb-8">
          {characters.map((c) => (
            <CharacterShort key={c.id} character={c} onTitleClick={() => {}} />
          ))}
        </div>
      </FoldableSection>
      <FoldableSection title="Contractors">
        <div className="flex flex-col gap-2 mb-8">
          {contractors.map((c) => (
            <ContractorShort
              key={c.id}
              contractor={c}
              onTitleClick={() => {}}
            />
          ))}
        </div>
      </FoldableSection>
      <FoldableSection title="Monsters">
        <Monsters game={game} setGame={setGame} setMode={setMode} log={log}/>
      </FoldableSection>
      <FoldableSection title="NPCs">
        <NPCs game={game} setGame={setGame} />
      </FoldableSection>
      <FoldableSection title="Custom Entries">
        <CustomEntries game={game} setGame={setGame} />
      </FoldableSection>
    </div>
  );
}
