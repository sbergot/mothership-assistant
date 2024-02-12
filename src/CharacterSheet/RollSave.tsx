import { analyseRoll } from "helpers";
import { Log } from "Messages/types";
import { useState } from "react";
import { allSaves } from "Rules/data";
import { CharacterSkill, RollMode, SaveType } from "Rules/types";
import { rollSave } from "Services/diceServices";
import { Block, Button, Divider } from "UI/Atoms";
import { SelectableRating, Skill } from "UI/Molecules";
import { ReadWriteCharacter, SetMode } from "./types";
import { allSkillsDict } from "Rules/Data/skills";

interface Props extends ReadWriteCharacter, Log, SetMode {}

export function RollSave({ character, setCharacter, log, setMode }: Props) {
  const [save, setSave] = useState<SaveType>("body");
  const [skill, setSkill] = useState<CharacterSkill | null>(null);
  const [rollMode, setRollMode] = useState<RollMode>("normal");

  return (
    <Block variant="light">
      <div className="flex justify-center gap-8">
        {allSaves.map((s) => (
          <SelectableRating
            key={s}
            title={s}
            value={character[s]}
            onClick={() => setSave(s)}
            selected={s === save}
          />
        ))}
      </div>
      <Divider />
      <div className="flex flex-wrap justify-center items-center gap-4">
        {character.skills.map((s) => (
          <Skill
            key={s.type}
            skill={allSkillsDict[s.type]}
            onClick={() => {
              setSkill((ss) => (ss?.type === s.type ? null : s));
            }}
            selected={s.type === skill?.type}
          />
        ))}
      </div>
      <Divider />
      <div className="flex justify-center gap-2">
        <Button
          light={rollMode !== "advantage"}
          rounded
          onClick={() => {
            setRollMode((m) => (m === "advantage" ? "normal" : "advantage"));
          }}
        >
          advantage
        </Button>
        <Button
          light={rollMode !== "disadvantage"}
          rounded
          onClick={() => {
            setRollMode((m) =>
              m === "disadvantage" ? "normal" : "disadvantage"
            );
          }}
        >
          disadvantage
        </Button>
      </div>
      <Divider />
      <div className="flex justify-center gap-2">
        <Button
          dark
          rounded
          onClick={() => {
            const results = rollSave({
	      save: { value: character[save], name: save },
	      skill,
              rollMode,
            });
            log({
              type: "SaveRollMessage",
              props: results,
            });
            const analysis = analyseRoll(results);
            if (!analysis.isSuccess) {
              setCharacter((c) => ({ ...c, stress: c.stress + 1 }));
            }
            setMode({ mode: "CharacterSheet" });
          }}
        >
          roll
        </Button>
        <Button
          rounded
          onClick={() => {
            setMode({ mode: "CharacterSheet" });
          }}
        >
          back
        </Button>
      </div>
    </Block>
  );
}
