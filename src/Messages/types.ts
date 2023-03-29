import { StatRollResult } from "Rules/types";

export interface Message<T extends string, P> {
  type: T;
  props: P;
}

export interface SimpleMessage {
  content: string;
}

export type GameMessage =
  | Message<"StatRollMessage", StatRollResult>
  | Message<"SimpleMessage", SimpleMessage>;

export type StampedMessage = GameMessage & { author?: string; time: string };

export interface Log {
  log(m: GameMessage): void;
}
