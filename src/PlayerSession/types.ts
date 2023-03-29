import { StatRollResult } from "Rules/types";

export interface Message<T extends string, P> {
  type: T;
  props: P;
}

export type AnyMessage = Message<"StatRollMessage", StatRollResult>;

export type StampedMessage = AnyMessage & { author: string; time: string };

export interface Log {
  log(m: AnyMessage): void;
}
