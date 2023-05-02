import { useEffect, useRef, useState } from "react";
import { Block, Button, RoundButton } from "UI/Atoms";
import { ShowMessage } from "./ShowMessage";
import {
  ContextType,
  Log,
  MessageContext,
  PlayerMessageContext,
  RevealedElements,
  StampedMessage,
  WardenMessageContext,
} from "./types";
import { ReadWriteCharacter, SetMode } from "CharacterSheet/types";
import { SetDmMode } from "DmSession/types";
import { ChatIcon, NewsIcon } from "UI/Icons";
import { RevealedElementDisplay } from "UI/Organisms/RevealedElementDisplay";

interface Props {
  messages: StampedMessage[];
  authorId: string;
  contextType: ContextType;
  commonContext: Log & RevealedElements;
  playerContext?: ReadWriteCharacter & SetMode;
  wardenContext?: SetDmMode;
}

function showLocalTime(t: string): string {
  const date = new Date(t);
  return date.toLocaleString();
}

export function MessagePanel({
  messages,
  authorId,
  contextType,
  commonContext,
  playerContext,
  wardenContext,
}: Props) {
  const messagesEnd = useRef<HTMLDivElement | null>(null);
  const [clearTime, setClearTime] = useState<Date>(new Date(0));
  const [tab, setTab] = useState<"messages" | "data">("messages");

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
    <div className="h-full">
      <div className="flex justify-end gap-2 mb-2">
        <RoundButton
          light={tab !== "data"}
          onClick={() => {
            setTab("data");
          }}
        >
          <NewsIcon />
        </RoundButton>
        <RoundButton
          light={tab !== "messages"}
          onClick={() => {
            setTab("messages");
          }}
        >
          <ChatIcon />
        </RoundButton>
      </div>
      <div className="overflow-auto flex flex-col gap-2 h-full border-2 rounded-3xl p-4 mb-2 border-mother-5 bg-white">
        {tab === "messages" && (
          <>
            {messages
              .filter((m) => new Date(m.time) > clearTime)
              .map((m, i) => {
                const stamp = `${m.author} - ${showLocalTime(m.time)}`;
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
                        ...wardenContext!,
                      } satisfies WardenMessageContext);
                return m.type === "SimpleMessage" ? (
                  <div key={i} className="text-sm">
                    <span className="text-mother-4">{stamp}</span> -{" "}
                    {m.props.content}
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
            <Button dark rounded onClick={() => setClearTime(new Date())}>
              clear messages
            </Button>
          </>
        )}
        {tab === "data" &&
          commonContext.revealedElements.map((e) => (
            <RevealedElementDisplay elt={e} />
          ))}
        <div style={{ float: "left", clear: "both" }} ref={messagesEnd}></div>
      </div>
    </div>
  );
}
