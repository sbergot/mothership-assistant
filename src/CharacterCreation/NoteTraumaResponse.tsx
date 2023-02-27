import { Block, Button2, Title } from "../Atoms";
import { classDefinitionsDict } from "../Data/data";
import { StepProps } from "./types";

export function NoteTraumaResponse({ character, onConfirm }: StepProps) {
  const done = true;
  const { characterClass } = character;
  return (
    <div className="flex flex-col">
      <Block variant="light">
        <Title>6. Take note of your class's trauma response</Title>
        <div className="rounded-xl bg-mother-4 text-mother-1 flex flex-col gap-2 pb-2 cursor-pointer">
          <div className="rounded-3xl bg-mother-6 text-center relative">
            {characterClass}
          </div>
          <div className="px-4 text-base">
            <div className="flex flex-col gap-1">
              {classDefinitionsDict[characterClass].traumaResponse}
            </div>
          </div>
        </div>
      </Block>
      <div className="self-center">
        <Button2 disabled={!done} onClick={() => onConfirm(character)}>
          Confirm
        </Button2>
      </div>
    </div>
  );
}
