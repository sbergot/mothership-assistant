import { Character } from "Rules/types";
import { Modes, ReadWriteGame } from "./types";
import { DmSheet } from "./DmSheet";
import { DealDamage } from "./DealDamage";
import { Log } from "Messages/types";
import { Roll } from "./Roll";

interface Props extends ReadWriteGame, Log {
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
  log,
}: Props) {
  if (mode.mode === "DmSheet") {
    return (
      <DmSheet
        game={game}
        setGame={setGame}
        setMode={setMode}
        characters={characters}
      />
    );
  }

  if (mode.mode === "DmRoll") {
    return <Roll log={log} setMode={setMode} />;
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
