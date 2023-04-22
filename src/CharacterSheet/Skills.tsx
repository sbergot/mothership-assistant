import { Block, Button, Divider, Title } from "UI/Atoms";
import { Skill, SkillInTraining } from "UI/Molecules";
import { ReadCharacter, SetMode } from "./types";
import { allSkillsDict } from "Rules/Data/skills";

export function Skills({ character, setMode }: ReadCharacter & SetMode) {
  return (
    <Block variant="light">
      <Title>Skills</Title>
      <Divider />
      <div className="flex flex-wrap justify-center items-center gap-4">
        {character.skills.map((s) => (
          <Skill
            key={s.type}
            skill={allSkillsDict[s.type]}
            onClick={() => setMode({ mode: "ViewSkill", skill: s })}
          />
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
          <SkillInTraining
            character={character}
            onClick={() => setMode({ mode: "TrainSkill" })}
          />
        )}
      </div>
    </Block>
  );
}
