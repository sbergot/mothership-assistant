import { Character, Game } from "Rules/types";
import { Modes, ReadWriteGame } from "./types";
import { DmSheet } from "./DmSheet";
import { DealDamage } from "./DealDamage";
import { Log } from "Messages/types";
import { Roll } from "./Roll";
import { DmSessionTabs } from "./DmSessionTabs";
import { DmTables } from "./DmTables";
import { DmTimers } from "./DmTimers";
import { AddAttack } from "./AddAttack";
import { ListAttacks } from "./ListAttacks";

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
      <>
        <DmSessionTabs mode={mode} setMode={setMode} />
        <DmSheet
          game={game}
          setGame={setGame}
          characters={characters}
          setMode={setMode}
          log={log}
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

  if (mode.mode === "DmTables") {
    return (
      <>
        <DmSessionTabs mode={mode} setMode={setMode} />
        <DmTables
          game={game}
          setGame={setGame}
        />
      </>
    );
  }

  if (mode.mode === "DmTimers") {
    return (
      <>
        <DmSessionTabs mode={mode} setMode={setMode} />
        <DmTimers game={game} setGame={setGame} />
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

  if (mode.mode === "ListAttacks") {
    return (
      <ListAttacks
        game={game}
        setGame={setGame}
        setMode={setMode}
        monsterId={mode.monsterId}
      />
    );
  }

  if (mode.mode === "AddAttack") {
    return (
      <AddAttack
        game={game}
        setGame={setGame}
        setMode={setMode}
        monsterId={mode.monsterId}
        attackId={mode.attackId}
      />
    );
  }

  return <div>unknown mode</div>;
}
