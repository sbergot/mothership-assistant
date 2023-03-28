import { allSaves, allStats } from "Rules/data";
import { Character, Contractor } from "Rules/types";
import { TrashIcon } from "UI/Icons";
import { Rating, Gauge } from "UI/Molecules";

interface Props {
  character: Character;
  onTitleClick(): void;
}

export function CharacterShort({ character, onTitleClick }: Props) {
  return (
    <div className="rounded-xl bg-mother-2 flex flex-col gap-4">
      <div
        className="rounded-3xl bg-mother-6 text-mother-1 text-center cursor-pointer hover:bg-mother-5"
        onClick={onTitleClick}
      >
        {character.name}
      </div>
      <div className="flex flex-col gap-2 p-4">
        <div className="flex justify-center gap-8">
          {allStats.map((s) => (
            <Rating key={s} title={s} value={character[s]} />
          ))}
        </div>
        <div className="flex justify-center gap-8">
          {allSaves.map((s) => (
            <Rating key={s} title={s} value={character[s]} />
          ))}
        </div>
        <div className="flex justify-center gap-4">
          <Gauge
            title="Health"
            limitName="Maximum"
            current={character.health}
            limit={character.maxHealth}
          />
          <Gauge
            title="Wounds"
            limitName="Maximum"
            current={character.wounds}
            limit={character.maxWounds}
          />
          <Gauge
            title="Stress"
            limitName="Minimum"
            current={character.stress}
            limit={character.minStress}
          />
        </div>
      </div>
    </div>
  );
}
