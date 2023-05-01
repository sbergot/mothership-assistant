import { Character, Game } from "Rules/types";
import { Modes, ReadWriteGame } from "./types";
import { DmSheet } from "./DmSheet";
import { DealDamage } from "./DealDamage";
import { Log } from "Messages/types";
import { Roll } from "./Roll";
import { DmSessionTabs } from "./DmSessionTabs";

interface Props extends ReadWriteGame, Log {
  characters: Character[];
  mode: Modes;
  setMode(mode: Modes): void;
  updateRevealedElements(c: Game): void;
}

export function DmSessionRouting({
  game,
  setGame,
  mode,
  characters,
  setMode,
  log,
  updateRevealedElements,
}: Props) {
  if (mode.mode === "DmSheet") {
    return (
      <>
        <DmSessionTabs mode={mode} setMode={setMode} />
        <DmSheet
          game={game}
          setGame={setGame}
          characters={characters}
          updateRevealedElements={updateRevealedElements}
        />
      </>
    );
  }

  if (mode.mode === "DmRoll") {
    return (
      <>
        <DmSessionTabs mode={mode} setMode={setMode} />
        <Roll log={log} />
      </>
    );
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
