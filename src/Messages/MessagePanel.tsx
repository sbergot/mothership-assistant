import { StampedMessage } from "Session/types";
import { Block } from "UI/Atoms";
import { ShowMessage } from "./ShowMessage";

interface Props {
  messages: StampedMessage[];
}

export function MessagePanel({ messages }: Props) {
  return (
    <div className="max-w-lg w-full h-screen sticky top-2 border-2 rounded-3xl p-4 mb-2 border-mother-5 flex flex-col gap-2">
      {messages.map((m) => {
        return (
          <Block variant="light">
            <div>
              <div className="text-sm text-mother-4">
                {m.author} - {m.time}
              </div>
              <ShowMessage message={m} />
            </div>
          </Block>
        );
      })}
    </div>
  );
}
