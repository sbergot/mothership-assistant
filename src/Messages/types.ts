import {
  ReadCharacter,
  ReadWriteCharacter,
  SetMode,
} from "CharacterSheet/types";
import {
  AttackRollResult,
  InflictedDamage,
  PanicEffect,
  PanicRollResult,
  SaveRollResult,
  StatRollResult,
  WoundEffectEntry,
} from "Rules/types";

export type ContextType = "player" | "warden";

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
  | Message<"DamageMessage", InflictedDamage>
  | Message<"WoundEffectMessage", WoundEffectEntry>
  | Message<"SimpleMessage", SimpleMessage>;

export interface BaseMessageContext extends Log {
  isOwnMessage: boolean;
}

export interface PlayerMessageContext
  extends BaseMessageContext,
    ReadWriteCharacter,
    SetMode {
  type: "player";
}

export interface WardenMessageContext extends BaseMessageContext {
  type: "warden";
}

export type MessageContext = PlayerMessageContext | WardenMessageContext;

export type StampedMessage = GameMessage & {
  authorId: string;
  author: string;
  time: string;
};

export type AnyMessage = StampedMessage | SyncMessage;

export interface Log {
  log(m: GameMessage): void;
}

export interface ConnectionMetadata {
  browserId: string;
}
