import { useState } from "react";
import { ChatIcon, XIcon } from "./Icons";

interface Props {
  leftPart: React.ReactNode;
  rightPart: React.ReactNode;
}

export function MobileLayout({ leftPart, rightPart }: Props) {
  const [isMessagePanelVisible, setIsMessagePanelVisible] = useState(false);
  const visibilityClasses = isMessagePanelVisible
    ? "opacity-100"
    : "opacity-0 invisible lg:opacity-100 lg:visible";
  return (
    <>
      <div className="flex gap-2">
        <div className="max-w-2xl w-full">{leftPart}</div>
        <div
          className={`transition-all max-w-[calc(100vw-4rem)] test lg:max-w-[calc(100vw - 50rem)] w-full h-[calc(100dvh-1rem)] fixed bottom-2 right-6 border-2 rounded-3xl p-4 mb-2 border-mother-5 bg-white ${visibilityClasses}`}
        >
          {rightPart}
        </div>
      </div>
      <div
        className="w-12 h-12 rounded-full bg-mother-3 border-mother-5 hover:bg-mother-4 border-2 fixed right-8 bottom-8 transition-all cursor-pointer active:scale-90 visible lg:invisible flex items-center justify-center print:invisible"
        onClick={() => setIsMessagePanelVisible((v) => !v)}
      >
        <div className="scale-125">
          {isMessagePanelVisible ? <XIcon /> : <ChatIcon />}
        </div>
      </div>
    </>
  );
}
