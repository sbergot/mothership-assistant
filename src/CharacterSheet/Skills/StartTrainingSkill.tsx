import { ReadWriteCharacter, SetMode } from "CharacterSheet/types";
import { allSkillLevelDefinitionDict, allSkillsDict } from "Rules/Data/skills";
import { SkillType } from "Rules/types";
import { Block, Button, Divider, Title } from "UI/Atoms";

type Props = ReadWriteCharacter & SetMode & { skill: SkillType };

export function StartTrainingSkill({
  character,
  setCharacter,
  setMode,
  skill,
}: Props) {
  const definition = allSkillsDict[skill];
  const levelDefinition = allSkillLevelDefinitionDict[definition.level];

  return (
    <Block variant="light">
      <Title>{definition.name}</Title>
      <Divider />
      <div className="text-center">{definition.description}</div>
      <Divider />
      <span>Training materials</span>
      {levelDefinition.trainingCost}
      <Divider />
      <span>Your credits</span>
      {character.credits}
      <Divider />
      <div className="flex justify-center gap-2">
        <Button
          rounded
          dark
          onClick={() => {
            setCharacter((character) => ({
              ...character,
              skillInProgress: skill,
              skillTrainingYearsRemaining: levelDefinition.trainingTimeYear,
              skillTrainingMonthsRemaining: 0,
              credits: character.credits - levelDefinition.trainingCost
            }));
            setMode({ mode: "TrainSkill" });
          }}
        >
          Pay for materials & start training
        </Button>
        <Button
          onClick={() => {
            setCharacter((character) => ({
              ...character,
              skillInProgress: skill,
              skillTrainingYearsRemaining: levelDefinition.trainingTimeYear,
              skillTrainingMonthsRemaining: 0,
            }));
            setMode({ mode: "TrainSkill" });
          }}
        >
          Start training without paying
        </Button>
      </div>
    </Block>
  );
}
