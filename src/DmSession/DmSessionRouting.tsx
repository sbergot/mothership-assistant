import { Character } from "Rules/types";
import { Modes, ReadWriteGame } from "./types";
import { DmSheet } from "./DmSheet";
import { DealDamage } from "./DealDamage";

interface Props extends ReadWriteGame {
  characters: Character[];
  mode: Modes;
  setMode(mode: Modes): void;
}

export function DmSessionRouting({
  game,
  setGame,
  mode,
  characters,
  setMode,
}: Props) {
  if (mode.mode === "DmSheet") {
    return <DmSheet game={game} setGame={setGame} characters={characters} />;
  }

  if (mode.mode === "DealDamage") {
    return (
      <DealDamage
        game={game}
        setGame={setGame}
        setMode={setMode}
        damage={mode.damage}
      />
    );
  }

  return <div>unknown mode</div>;
}
