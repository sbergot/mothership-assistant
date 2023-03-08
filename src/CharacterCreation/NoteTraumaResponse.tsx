import { Block, Button, Title } from "UI/Atoms";
import { classDefinitionsDict } from "Rules/data";
import { BlockWithTitle } from "UI/Molecules";
import { StepProps } from "./types";

export function NoteTraumaResponse({ character, onConfirm }: StepProps) {
  const done = true;
  const { characterClass } = character;
  return (
    <div className="flex flex-col">
      <Block variant="light">
        <Title>6. Take note of your class's trauma response</Title>
        <BlockWithTitle title={characterClass}>
          {classDefinitionsDict[characterClass].traumaResponse}
        </BlockWithTitle>
      </Block>
      <div className="self-center">
        <Button rounded dark disabled={!done} onClick={() => onConfirm(character)}>
          Confirm
        </Button>
      </div>
    </div>
  );
}
