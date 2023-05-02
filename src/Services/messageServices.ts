import { GameMessage, StampedMessage } from "Messages/types";
import { useState } from "react";

function getNow(): string {
  const now = new Date();
  return now.toISOString();
}

export function stamp(
  character: { id: string; name: string },
  m: GameMessage
): StampedMessage {
  return {
    ...m,
    author: character.name,
    authorId: character.id,
    time: getNow(),
  };
}

export function useLog(author: string, authorId: string) {
  const [messages, setMessages] = useState<StampedMessage[]>([]);

  function log(m: GameMessage) {
    setMessages((ms) => [...ms, stamp({ id: authorId, name: author }, m)]);
  }

  return { messages, log };
}
