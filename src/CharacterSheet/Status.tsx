import { allConditionDefinitionsDict } from "Rules/data";
import { Block, Button, Divider, Tag, Title } from "UI/Atoms";
import { Gauge } from "UI/Molecules";
import { ReadCharacter, SetMode } from "./types";

export function Status({ character, setMode }: ReadCharacter & SetMode) {
  return (
    <Block variant="light">
      <Title>Status report</Title>
      <div className="flex justify-around">
        <Gauge
          title="Health"
          limitName="Maximum"
          current={character.health}
          limit={character.maxHealth}
        />
        <Gauge
          title="Wounds"
          limitName="Maximum"
          current={character.wounds}
          limit={character.maxWounds}
        />
        <Gauge
          title="Stress"
          limitName="Minimum"
          current={character.stress}
          limit={character.minStress}
        />
      </div>
      <Divider />
      {character.conditions.length > 0 && <Title>Warning!</Title>}
      <div className="flex flex-wrap justify-center gap-2">
        {character.conditions.map((c) => (
          <Tag variant="dark">
            {allConditionDefinitionsDict[c.conditionType].name}
          </Tag>
        ))}
        <Button onClick={() => setMode({ mode: "AddCondition" })}>
          Add condition
        </Button>
      </div>
    </Block>
  );
}
