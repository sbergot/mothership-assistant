import { GameMessage, StampedMessage } from "Messages/types";
import { useState } from "react";

function getNow(): string {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const nowLocal = new Date(now.getTime() - offset * 60 * 1000);
  return nowLocal.toISOString().split(".")[0];
}

export function useLog(author: string) {
  const [messages, setMessages] = useState<StampedMessage[]>([]);

  function stamp(m: GameMessage): StampedMessage {
    return {
      ...m,
      author: author,
      time: getNow(),
    };
  }

  function log(m: GameMessage) {
    setMessages((ms) => [...ms, stamp(m)]);
  }

  return { messages, log };
}
