import { Block, Button, Divider, Title } from "UI/Atoms";
import { allSkillsDict } from "Rules/data";
import { Skill, SkillInTraining } from "UI/Molecules";
import { ReadCharacter, SetMode } from "./types";

export function Skills({ character, setMode }: ReadCharacter & SetMode) {
  return (
    <Block variant="light">
      <Title>Skills</Title>
      <Divider />
      <div className="flex flex-wrap justify-center items-center gap-4">
        {character.skills.map((s) => (
          <Skill key={s} skill={allSkillsDict[s]} />
        ))}
        {character.skillInProgress === null && (
          <Button
            onClick={() => {
              setMode({ mode: "SelectSkill" });
            }}
          >
            Train skill
          </Button>
        )}
        {character.skillInProgress !== null && (
          <SkillInTraining character={character} onClick={() => setMode({ mode: "TrainSkill" })} />
        )}
      </div>
    </Block>
  );
}
