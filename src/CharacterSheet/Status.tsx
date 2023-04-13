import { allConditionDefinitionsDict, classDefinitionsDict } from "Rules/data";
import { Block, Button, Divider, Title } from "UI/Atoms";
import { Gauge } from "UI/Molecules";
import { ReadWriteCharacter, SetMode } from "./types";
import { GameMessage, Log } from "Messages/types";
import { roll } from "Services/diceServices";

export function Status({
  character,
  setCharacter,
  setMode,
  log
}: ReadWriteCharacter & SetMode & Log) {
  return (
    <Block variant="light">
      <Title>Status report</Title>
      <div className="flex justify-around">
        <Gauge
          title="Health"
          onChange={(n) => setCharacter((char) => ({ ...char, health: n }))}
          limitName="Maximum"
          current={character.health}
          limit={character.maxHealth}
        />
        <Gauge
          title="Wounds"
          limitName="Maximum"
          current={character.wounds}
          onChange={(n) => setCharacter((char) => ({ ...char, wounds: n }))}
          limit={character.maxWounds}
        />
        <Gauge
          title="Stress"
          limitName="Minimum"
          current={character.stress}
          onChange={(n) => setCharacter((char) => ({ ...char, stress: n }))}
          limit={character.minStress}
        />
      </div>
      <Divider />
      <div className="text-center">
        {classDefinitionsDict[character.characterClass].traumaResponse}
      </div>
      <Divider />
      {character.conditions.length > 0 && <Title>Warning!</Title>}
      <div className="flex flex-wrap justify-center gap-2">
        {character.conditions.map((c) => (
          <Button
            key={c.conditionType}
            dark
            onClick={() =>
              setMode({ mode: "ViewCondition", condition: c.conditionType })
            }
          >
            {allConditionDefinitionsDict[c.conditionType].name}
          </Button>
        ))}
        {character.bleeding > 0 && (
          <Button
            key="bleeding"
            dark
            onClick={() => {
              setMode({ mode: "ViewBleeding" });
            }}
          >
            Bleeding ({character.bleeding})
          </Button>
        )}
        <Button onClick={() => setMode({ mode: "AddCondition" })}>
          Add condition
        </Button>
        <Button onClick={() => setMode({ mode: "PanicCheck" })}>
          Panic check
        </Button>
        <Button onClick={() => setMode({ mode: "TakeDamage" })}>
          Take damages
        </Button>
        <Button onClick={() => setMode({ mode: "RollWound" })}>
          Roll wound
        </Button>
        <Button onClick={() => deathCheck(log)}>
          Death check
        </Button>
      </div>
    </Block>
  );
}

function deathCheck(log: (m: GameMessage) => void) {
  const rollValue = roll(1, 10);
  log({ type: "DeathCheckMessage", props: { rollValue } });
}
