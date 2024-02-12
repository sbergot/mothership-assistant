import {
  ReadCharacter,
  ReadWriteCharacter,
  SetMode,
} from "CharacterSheet/types";
import { SetDmMode } from "DmSession/types";
import {
  AttackRollResult,
  DeathCheckResult,
  GenericRollResult,
  InflictedDamage,
  PanicEffect,
  PanicRollResult,
  RevealedElement,
  RollResult,
  RollResult,
  WoundEffectEntry,
} from "Rules/types";

export type ContextType = "player" | "warden";

export interface Message<T extends string, P> {
  type: T;
  props: P;
  transient?: boolean;
  wardenOnly?: boolean;
}

export interface SimpleMessage {
  content: string;
}

export interface MessageHistory {
  messages: StampedMessage[];
}

export interface RevealedElements {
  revealedElements: RevealedElement[];
}

export type SyncMessage =
  | Message<"UpdateChar", ReadCharacter>
  | Message<"RevealedElementsRequest", {}>
  | Message<"RevealedElementsResponse", RevealedElements>
  | Message<"MessageHistoryRequest", {}>
  | Message<"MessageHistoryResponse", MessageHistory>;

export type GameMessage =
  | Message<"GenericRollMessage", GenericRollResult>
  | Message<"StatRollMessage", RollResult>
  | Message<"AttackRollMessage", AttackRollResult>
  | Message<"SaveRollMessage", RollResult>
  | Message<"RestRollMessage", RollResult>
  | Message<"PanicRollMessage", PanicRollResult>
  | Message<"DeathCheckMessage", DeathCheckResult>
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

export interface WardenMessageContext extends BaseMessageContext, SetDmMode {
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
