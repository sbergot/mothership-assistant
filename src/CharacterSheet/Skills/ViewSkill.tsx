import { SetMode, WriteCharacter } from "CharacterSheet/types";
import { allSkillsDict } from "Rules/data";
import { SkillType } from "Rules/types";
import { Block, Button, Divider, Title } from "UI/Atoms";

type Props = WriteCharacter & SetMode & { skill: SkillType };

export function ViewSkill({ setCharacter, setMode, skill }: Props) {
  const definition = allSkillsDict[skill];

  return (
    <Block variant="light">
      <Title>{definition.name}</Title>
      <Divider />
      <div className="text-center">{definition.description}</div>
      <Divider />
      <div className="flex justify-center gap-2">
        <Button
          rounded
          dark
          onClick={() => {
            setCharacter((character) => ({
              ...character,
              skills: character.skills.filter((s) => s !== skill),
            }));
            setMode({ mode: "CharacterSheet" });
          }}
        >
          Remove skill
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
