import { useState } from "react";

interface Props {
  leftPart: React.ReactNode;
  rightPart: React.ReactNode;
}

export function MobileLayout({ leftPart, rightPart }: Props) {
  const [isMessagePanelVisible, setIsMessagePanelVisible] = useState(false);
  const visibilityClasses = isMessagePanelVisible ? "" : "invisible lg:visible";
  return (
    <>
      <div className="flex gap-2">
        <div className="max-w-2xl w-full">{leftPart}</div>
        <div
          className={`max-w-[calc(100vw-4rem)] test lg:max-w-[calc(100vw - 50rem)] w-full h-[calc(100dvh-1rem)] fixed top-2 right-6 border-2 rounded-3xl p-4 mb-2 border-mother-5 bg-white ${visibilityClasses}`}
        >
          {rightPart}
        </div>
      </div>
      <div
        className="w-12 h-12 rounded-full bg-mother-4 hover:bg-mother-6 fixed right-8 bottom-8 cursor-pointer visible lg:invisible"
        onClick={() => setIsMessagePanelVisible((v) => !v)}
      />
    </>
  );
}
