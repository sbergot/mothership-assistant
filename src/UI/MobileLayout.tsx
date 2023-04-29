import { useState } from "react";
import { ChatIcon, EyeIcon, EyeSlashIcon, XIcon } from "./Icons";
import { RoundButton } from "./Atoms";

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
          className={`transition-all session-right-part ${visibilityClasses}`}
        >
          {rightPart}
        </div>
      </div>
      <div className="fixed right-8 bottom-8 print:invisible visible lg:invisible">
        <RoundButton onClick={() => setIsMessagePanelVisible((v) => !v)}>
          {isMessagePanelVisible ? <EyeSlashIcon /> : <EyeIcon />}
        </RoundButton>
      </div>
    </>
  );
}
