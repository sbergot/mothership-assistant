import { allConditionDefinitions } from "Rules/data";
import { Block, Button, Button2, Divider, Title } from "UI/Atoms";
import { ReadWriteCharacter, SetMode } from "./types";

type Props = ReadWriteCharacter & SetMode;

export function AddCondition({ setCharacter, character, setMode }: Props) {
  function back() {
    setMode({ mode: "CharacterSheet" });
  }
  return (
    <Block variant="light">
      <Title>Add panic effect</Title>
      <Divider />
      <div className="flex flex-wrap gap-2">
        {allConditionDefinitions
          .filter((c1) =>
            character.conditions.every(
              (c2) => c2.conditionType !== c1.conditionType
            )
          )
          .map((c) => (
            <Button2
              onClick={() => {
                setCharacter((character) => ({
                  ...character,
                  conditions: [
                    ...character.conditions,
                    { conditionType: c.conditionType },
                  ],
                }));
                back();
              }}
            >
              {c.name}
            </Button2>
          ))}
      </div>
      <Divider />
      <Button onClick={back}>Back</Button>
    </Block>
  );
}
