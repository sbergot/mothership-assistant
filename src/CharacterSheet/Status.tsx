import { Block, Button, Divider, Tag, Title } from "UI/Atoms";
import { Gauge } from "UI/Molecules";
import { Character } from "Rules/types";

interface Props {
  character: Character;
}

export function Status({ character }: Props) {
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
      <Title>Warning!</Title>
      <div className="flex flex-wrap justify-center gap-2">
        {character.conditions.map((c) => (
          <Tag variant="dark">{c.conditionType}</Tag>
        ))}
        <Button onClick={() => {}}>Add condition</Button>
      </div>
    </Block>
  );
}
