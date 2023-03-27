import { allSaves, allStats } from "Rules/data";
import { Character, Contractor } from "Rules/types";
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
      <div className="p-4">
        <div className="flex gap-4">
          {allStats.map((s) => (
            <Rating title={s} value={character[s]} />
          ))}
        </div>
        <div className="flex gap-4">
          {allSaves.map((s) => (
            <Rating title={s} value={character[s]} />
          ))}
        </div>
        <Gauge
          title="Wounds"
          limitName="Maximum"
          current={character.wounds}
          limit={character.maxWounds}
        />
      </div>
    </div>
  );
}
