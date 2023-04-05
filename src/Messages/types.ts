import { ReadCharacter } from "CharacterSheet/types";
import {
  AttackRollResult,
  PanicEffect,
  PanicRollResult,
  SaveRollResult,
  StatRollResult,
  WoundEffectEntry,
} from "Rules/types";

export interface Message<T extends string, P> {
  type: T;
  props: P;
}

export interface SimpleMessage {
  content: string;
}

export interface MessageHistory {
  messages: StampedMessage[];
}

export type SyncMessage =
  | Message<"UpdateChar", ReadCharacter>
  | Message<"MessageHistoryRequest", {}>
  | Message<"MessageHistoryResponse", MessageHistory>;

export type GameMessage =
  | Message<"StatRollMessage", StatRollResult>
  | Message<"AttackRollMessage", AttackRollResult>
  | Message<"SaveRollMessage", SaveRollResult>
  | Message<"PanicRollMessage", PanicRollResult>
  | Message<"PanicEffectMessage", PanicEffect>
  | Message<"WoundEffectMessage", WoundEffectEntry>
  | Message<"SimpleMessage", SimpleMessage>;

export type StampedMessage = GameMessage & { author?: string; time: string };

export type AnyMessage = StampedMessage | SyncMessage;

export interface Log {
  log(m: GameMessage): void;
}

export interface ConnectionMetadata {
  browserId: string;
}
