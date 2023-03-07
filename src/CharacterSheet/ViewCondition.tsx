import {
  allConditionDefinitions,
  allConditionDefinitionsDict,
} from "Rules/data";
import { ConditionType } from "Rules/types";
import { Block, Button, Button2, Divider, Title } from "UI/Atoms";
import { ReadWriteCharacter, SetMode } from "./types";

type Props = ReadWriteCharacter & SetMode & { condition: ConditionType };

export function ViewCondition({ setCharacter, setMode, condition }: Props) {
  function back() {
    setMode({ mode: "CharacterSheet" });
  }

  const definition = allConditionDefinitionsDict[condition];

  return (
    <Block variant="light">
      <Title>{definition.name}</Title>
      <Divider />
      <div className="text-center">{definition.description}</div>
      <Divider />
      <div className="flex justify-center gap-2">
      <Button2
        onClick={() => {
          setCharacter((character) => ({
            ...character,
            conditions: character.conditions.filter(
              (c) => c.conditionType !== condition
            ),
          }));
          back();
        }}
      >
        Remove condition
      </Button2>
      <Button onClick={back}>Back</Button>
      </div>
    </Block>
  );
}
