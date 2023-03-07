import { allSkillLevelDefinitionDict, allSkillsDict } from "Rules/data";
import { SkillType } from "Rules/types";
import { Block, Button, Button2, Divider, Title } from "UI/Atoms";
import { ReadWriteCharacter, SetMode } from "./types";

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
        <Button2
          onClick={() => {
            setCharacter((character) => ({
              ...character,
              skillInProgress: skill,
              skillTrainingYearsRemaining: levelDefinition.trainingTimeYear,
              skillTrainingMonthsRemaining: 0,
              credits: character.credits - levelDefinition.trainingCost
            }));
            setMode({ mode: "CharacterSheet" });
          }}
        >
          Pay for materials & start training
        </Button2>
        <Button
          onClick={() => {
            setCharacter((character) => ({
              ...character,
              skillInProgress: skill,
              skillTrainingYearsRemaining: levelDefinition.trainingTimeYear,
              skillTrainingMonthsRemaining: 0,
            }));
            setMode({ mode: "CharacterSheet" });
          }}
        >
          Start training without paying
        </Button>
      </div>
    </Block>
  );
}
