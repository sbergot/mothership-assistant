import { useState } from "react";
import { Block, Button2, Title } from "../Atoms";
import { CharacterClass } from "../types";
import { Children } from "../UITypes";
import { StepProps } from "./types";

export function SelectClass({ character, onConfirm }: StepProps) {
  const done = false;
  const [selectedClass, setSelectedClass] = useState<CharacterClass | null>(
    null
  );
  const [newCharacter, setCharacter] = useState({ ...character });
  function onSelection(className: CharacterClass) {
    setSelectedClass(className);
    setCharacter(c => ({...c, characterClass: className}))
  }
  return (
    <div className="flex flex-col">
      <Block variant="light">
        <Title>3. Select your class</Title>
        <div className="flex flex-wrap justify-center gap-4">
          <ClassSummary
            className="marine"
            onClick={onSelection}
            selected={selectedClass}
          >
            <div>+10 combat</div>
            <div>+10 body save</div>
            <div>+20 fear save</div>
            <div>+1 wound</div>
          </ClassSummary>
          <ClassSummary
            className="android"
            onClick={onSelection}
            selected={selectedClass}
          >
            <div>+20 intellect</div>
            <div>-10 to 1 stat</div>
            <div>+60 to fear save</div>
            <div>+1 wound</div>
          </ClassSummary>
          <ClassSummary
            className="teamster"
            onClick={onSelection}
            selected={selectedClass}
          >
            <div>+5 to all stats</div>
            <div>+10 to all saves</div>
          </ClassSummary>
          <ClassSummary
            className="scientist"
            onClick={onSelection}
            selected={selectedClass}
          >
            <div>+10 intellect</div>
            <div>+5 to 1 stat</div>
            <div>+30 to sanity save</div>
          </ClassSummary>
        </div>
      </Block>
      <div className="self-center">
      <Button2 disabled={!done} onClick={() => onConfirm(newCharacter)}>
          Confirm
        </Button2>
      </div>
    </div>
  );
}

interface ClassSummaryProps extends Children {
  className: CharacterClass;
  selected: CharacterClass | null;
  onClick(name: CharacterClass): void;
}

function ClassSummary({
  className,
  selected,
  children,
  onClick,
}: ClassSummaryProps) {
  const classes = selected == className ? "bg-mother-6" : "bg-mother-1";
  return (
    <div
      onClick={() => onClick(className)}
      className="w-48 rounded-xl bg-mother-4 text-mother-1 flex flex-col gap-2 pb-2 cursor-pointer"
    >
      <div className="rounded-3xl bg-mother-6 text-center relative">
        <div
          className={`circle-small ${classes} absolute left-0.5 top-0.5 border-2 border-mother-1`}
        />
        {className}
      </div>
      <div className="px-4 text-base">
        <div className="flex flex-col gap-1">{children}</div>
      </div>
    </div>
  );
}
