import { Game, InflictedDamage } from "Rules/types";

interface DmSessionMode<T extends string> {
  mode: T;
}

export type Modes =
  | DmSessionMode<"DmSheet">
  | DmSessionMode<"DmRoll">
  | DmSessionMode<"DmTables">
  | DmSessionMode<"DmTimers">
  | DmSessionMode<"DealDamage"> & { damage: InflictedDamage };

export interface ReadWriteGame {
  game: Game;
  setGame(setter: (c: Game) => Game): void;
}

export interface SetDmMode {
  setMode(mode: Modes): void;
}