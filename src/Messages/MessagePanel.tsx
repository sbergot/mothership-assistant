import { useEffect, useRef } from "react";
import { Block } from "UI/Atoms";
import { ShowMessage } from "./ShowMessage";
import { StampedMessage } from "./types";

interface Props {
  messages: StampedMessage[];
}

export function MessagePanel({ messages }: Props) {
  const messagesEnd = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesEnd.current) {
      messagesEnd.current.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
    }
  }, [messages]);

  return (
    <div className="max-w-lg w-full h-screen sticky top-2 border-2 rounded-3xl p-4 mb-2 border-mother-5">
      <div className="overflow-auto flex flex-col gap-2 h-full pr-1">
        {messages.map((m, i) => {
          return (
            <Block key={i} variant="light">
              <div>
                <div className="text-sm text-mother-4">
                  {m.author ? `${m.author} - ${m.time}` : m.time}
                </div>
                <ShowMessage message={m} />
              </div>
            </Block>
          );
        })}
        <div style={{ float: "left", clear: "both" }} ref={messagesEnd}></div>
      </div>
    </div>
  );
}
