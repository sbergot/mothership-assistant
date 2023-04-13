import { useEffect, useRef } from "react";
import { Block } from "UI/Atoms";
import { ShowMessage } from "./ShowMessage";
import {
  ContextType,
  Log,
  MessageContext,
  PlayerMessageContext,
  StampedMessage,
  WardenMessageContext,
} from "./types";
import { ReadWriteCharacter, SetMode } from "CharacterSheet/types";

interface Props {
  messages: StampedMessage[];
  authorId: string;
  contextType: ContextType;
  commonContext: Log;
  playerContext?: ReadWriteCharacter & SetMode;
}

export function MessagePanel({
  messages,
  authorId,
  contextType,
  commonContext,
  playerContext,
}: Props) {
  const messagesEnd = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesEnd.current) {
      messagesEnd.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    }
  }, [messages]);

  return (
    <div className="max-w-lg w-full h-[calc(100vh-1rem)] fixed top-2 right-6 border-2 rounded-3xl p-4 mb-2 border-mother-5 bg-white">
      <div className="overflow-auto flex flex-col gap-2 h-full pr-1">
        {messages.map((m, i) => {
          const stamp = `${m.author} - ${m.time}`;
          const isOwnMessage = m.authorId === authorId;
          const context: MessageContext =
            contextType === "player"
              ? ({
                  type: "player",
                  isOwnMessage,
                  ...commonContext,
                  ...playerContext!,
                } satisfies PlayerMessageContext)
              : ({
                  type: "warden",
                  isOwnMessage,
                  ...commonContext,
                } satisfies WardenMessageContext);
          return m.type === "SimpleMessage" ? (
            <div key={i} className="text-sm">
              <span className="text-mother-4">{stamp}</span> - {m.props.content}
            </div>
          ) : (
            <Block key={i} variant="light">
              <div>
                <div className="text-sm text-mother-4">{stamp}</div>
                <ShowMessage message={m} context={context} />
              </div>
            </Block>
          );
        })}
        <div style={{ float: "left", clear: "both" }} ref={messagesEnd}></div>
      </div>
    </div>
  );
}
