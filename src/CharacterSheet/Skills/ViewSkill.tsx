import { SetMode, WriteCharacter } from "CharacterSheet/types";
import { allSkillsDict } from "Rules/Data/skills";
import { CharacterSkill, SkillType } from "Rules/types";
import { Block, Button, Divider, Title } from "UI/Atoms";

type Props = WriteCharacter & SetMode & { skill: CharacterSkill };

export function ViewSkill({ setCharacter, setMode, skill }: Props) {
  const definition = allSkillsDict[skill.type];

  return (
    <Block variant="light">
      <Title>{definition.name}</Title>
      <Divider />
      <div className="text-center">{definition.description}</div>
      <div className="flex justify-center">
        <input
          type="checkbox"
          defaultChecked={skill.lossOfConfidence}
          onChange={(e) =>
            setCharacter((c) => ({
              ...c,
              skills: c.skills.map((s) => {
                if (s.type !== skill.type) {
                  return s;
                }
                return { ...s, lossOfConfidence: e.target.checked };
              }),
            }))
          }
        />{" "}
        Loss of confidence
      </div>
      <Divider />
      <div className="flex justify-center gap-2">
        <Button
          rounded
          dark
          onClick={() => {
            setCharacter((character) => ({
              ...character,
              skills: character.skills.filter((s) => s.type !== skill.type),
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
