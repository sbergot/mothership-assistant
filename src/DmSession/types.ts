import { Game } from "Rules/types";

interface DmSessionMode<T extends string> {
  mode: T;
}

export type Modes =
  | DmSessionMode<"DmSheet">
  | DmSessionMode<"DealDamage">;

export interface ReadWriteGame {
  game: Game;
  setGame(setter: (c: Game) => Game): void;
}

export interface SetDmMode {
  setMode(mode: Modes): void;
}