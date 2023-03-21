import { useState } from "react";
import { Character } from "Rules/types";
import { AnyMessage, StampedMessage } from "Session/types";

function getNow(): string {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const nowLocal = new Date(now.getTime() - offset * 60 * 1000);
  return nowLocal.toISOString().split(".")[0];
}

export function useLog(character: Character) {
  const [messages, setMessages] = useState<StampedMessage[]>([]);

  function stamp(m: AnyMessage): StampedMessage {
    return {
      ...m,
      author: character.name,
      time: getNow(),
    };
  }

  function log(m: AnyMessage) {
    setMessages((ms) => [...ms, stamp(m)]);
  }

  return { messages, log };
}
