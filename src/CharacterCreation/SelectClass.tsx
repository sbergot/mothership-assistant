import { useState } from "react";
import { Block, Button, Title } from "UI/Atoms";
import { allStats } from "Rules/data";
import { Rating, SelectableBlockWithTitle } from "UI/Molecules";
import { Character, CharacterClass, StatType } from "Rules/types";
import { Children } from "UI/types";
import { StepProps } from "./types";

const classBonuses: Record<CharacterClass, (c: Character) => Character> = {
  marine(c) {
    return {
      ...c,
      combat: c.combat + 10,
      body: c.body + 10,
      fear: c.fear + 20,
      maxWounds: 3,
      skills: [
        { type: "militaryTraining", lossOfConfidence: false },
        { type: "athletics", lossOfConfidence: false },
      ],
    };
  },
  android(c) {
    return {
      ...c,
      intellect: c.intellect + 20,
      fear: c.fear + 60,
      maxWounds: 3,
      skills: [
        { type: "linguistics", lossOfConfidence: false },
        { type: "computers", lossOfConfidence: false },
        { type: "mathematics", lossOfConfidence: false },
      ],
    };
  },
  scientist(c) {
    return {
      ...c,
      intellect: c.intellect + 10,
      sanity: c.sanity + 30,
      maxWounds: 2,
    };
  },
  teamster(c) {
    return {
      ...c,
      combat: c.combat + 5,
      strength: c.strength + 5,
      speed: c.speed + 5,
      intellect: c.intellect + 5,
      body: c.body + 10,
      fear: c.fear + 10,
      sanity: c.sanity + 10,
      skills: [
        { type: "industrialEquipment", lossOfConfidence: false },
        { type: "zeroG", lossOfConfidence: false },
      ],
      maxWounds: 2,
    };
  },
};

interface StatSelectionProps {
  onSelect(stat: StatType): void;
}

function StatSelection({ onSelect }: StatSelectionProps) {
  const [selectedStat, setSelectedStat] = useState<StatType | null>(null);

  function onStatSelection(stat: StatType) {
    setSelectedStat(stat);
    onSelect(stat);
  }

  return (
    <div className="flex justify-center gap-4">
      {allStats.map((s) => {
        return (
          <Button
            key={s}
            dark={s === selectedStat}
            onClick={() => onStatSelection(s)}
          >
            {s}
          </Button>
        );
      })}
    </div>
  );
}

interface ClassBonusProps {
  updateCharacter(update: (c: Character) => Character): void;
}

function AndroidStatSelection({ updateCharacter }: ClassBonusProps) {
  return (
    <div className="flex flex-col items-center">
      <div>Androids get a Stat modifier of -10. Choose one:</div>
      <StatSelection
        onSelect={(stat) =>
          updateCharacter((c) => ({ ...c, [stat]: c[stat] - 10 }))
        }
      />
    </div>
  );
}

function ScientistStatSelection({ updateCharacter }: ClassBonusProps) {
  return (
    <div className="flex flex-col items-center">
      <div>Scientists get a Stat modifier of +5. Choose one:</div>
      <StatSelection
        onSelect={(stat) =>
          updateCharacter((c) => ({ ...c, [stat]: c[stat] + 5 }))
        }
      />
    </div>
  );
}

interface ClassOptionsProps {
  onSelection(className: CharacterClass): void;
  selectedClass: CharacterClass | null;
}

function ClassOptions({ onSelection, selectedClass }: ClassOptionsProps) {
  return (
    <div className="flex flex-wrap justify-center items-stretch gap-4">
      <ClassSummary
        className="marine"
        onClick={onSelection}
        selected={selectedClass}
      >
        <div>+10 combat</div>
        <div>+10 body save</div>
        <div>+20 fear save</div>
        <div>+1 wound</div>
      </ClassSummary>
      <ClassSummary
        className="android"
        onClick={onSelection}
        selected={selectedClass}
      >
        <div>+20 intellect</div>
        <div>-10 to 1 stat</div>
        <div>+60 to fear save</div>
        <div>+1 wound</div>
      </ClassSummary>
      <ClassSummary
        className="teamster"
        onClick={onSelection}
        selected={selectedClass}
      >
        <div>+5 to all stats</div>
        <div>+10 to all saves</div>
      </ClassSummary>
      <ClassSummary
        className="scientist"
        onClick={onSelection}
        selected={selectedClass}
      >
        <div>+10 intellect</div>
        <div>+5 to 1 stat</div>
        <div>+30 to sanity save</div>
      </ClassSummary>
    </div>
  );
}

export function SelectClass({ character, onConfirm }: StepProps) {
  const [done, setDone] = useState(false);
  const [selectedClass, setSelectedClass] = useState<CharacterClass | null>(
    null
  );
  const [newCharacter, setCharacter] = useState({ ...character });

  function onSelection(className: CharacterClass) {
    setSelectedClass(className);
    setCharacter(
      classBonuses[className]({ ...character, characterClass: className })
    );
    setDone(className === "teamster" || className === "marine");
  }

  function setCharacterBonus(update: (c: Character) => Character) {
    if (selectedClass === null) {
      throw new Error("impossible");
    }
    setCharacter(
      update(
        classBonuses[selectedClass]({
          ...character,
          characterClass: selectedClass,
        })
      )
    );
    setDone(true);
  }

  return (
    <div className="flex flex-col">
      <Block variant="light">
        <Title>3. Select your class</Title>
        <div className="flex justify-center gap-8">
          <Rating title="Strength" value={newCharacter.strength} />
          <Rating title="Speed" value={newCharacter.speed} />
          <Rating title="Intellect" value={newCharacter.intellect} />
          <Rating title="Combat" value={newCharacter.combat} />
        </div>
        <div className="flex justify-center gap-8">
          <Rating title="Sanity" value={newCharacter.sanity} />
          <Rating title="Fear" value={newCharacter.fear} />
          <Rating title="Body" value={newCharacter.body} />
        </div>
        <ClassOptions onSelection={onSelection} selectedClass={selectedClass} />
        <div className="mt-2">
          {selectedClass == "android" && (
            <AndroidStatSelection updateCharacter={setCharacterBonus} />
          )}
          {selectedClass == "scientist" && (
            <ScientistStatSelection updateCharacter={setCharacterBonus} />
          )}
        </div>
      </Block>
      <div className="self-center mt-2">
        <Button
          rounded
          dark
          disabled={!done}
          onClick={() => onConfirm(newCharacter)}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
}

interface ClassSummaryProps extends Children {
  className: CharacterClass;
  selected: CharacterClass | null;
  onClick(name: CharacterClass): void;
}

function ClassSummary({
  className,
  selected,
  children,
  onClick,
}: ClassSummaryProps) {
  return (
    <div className="w-48">
      <SelectableBlockWithTitle
        title={className}
        selected={className === selected}
        onClick={() => onClick(className)}
      >
        {children}
      </SelectableBlockWithTitle>
    </div>
  );
}
