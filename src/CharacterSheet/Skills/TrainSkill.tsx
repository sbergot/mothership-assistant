import { ReadWriteCharacter, SetMode } from "CharacterSheet/types";
import { allSkillsDict } from "Rules/data";
import { Block, Button, Divider, Title } from "UI/Atoms";
import { GaugeBase } from "UI/Molecules";

type Props = ReadWriteCharacter & SetMode;

export function TrainSkill({ character, setCharacter, setMode }: Props) {
  const skill = character.skillInProgress;
  if (skill === null) {
    return <div>Error</div>;
  }
  const definition = allSkillsDict[skill];

  return (
    <Block variant="light">
      <Title>{definition.name}</Title>
      <Divider />
      <div className="text-center">{definition.description}</div>
      <Divider />
      <GaugeBase
        title="Time remaining in training"
        valueLeft={character.skillTrainingYearsRemaining}
        titleLeft="Years"
        valueRight={character.skillTrainingMonthsRemaining}
        titleRight="Months"
      />
      <Divider />
      <div className="flex justify-center gap-2">
        <Button
          rounded
          dark
          onClick={() => {
            setCharacter((character) => ({
              ...character,
              skillInProgress: null,
              skillTrainingYearsRemaining: 0,
              skillTrainingMonthsRemaining: 0,
              skills: [...character.skills, skill],
            }));
            setMode({ mode: "CharacterSheet" });
          }}
        >
          Complete training
        </Button>
        <Button
          onClick={() => {
            setCharacter((character) => ({
              ...character,
              skillInProgress: null,
              skillTrainingYearsRemaining: 0,
              skillTrainingMonthsRemaining: 0,
            }));
            setMode({ mode: "CharacterSheet" });
          }}
        >
          Cancel training
        </Button>
        <Button
          onClick={() => {
            setMode({ mode: "CharacterSheet" });
          }}
        >
          Back
        </Button>
      </div>
    </Block>
  );
}
