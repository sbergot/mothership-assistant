import { ReadCharacter } from "CharacterSheet/types";
import { allSkillLevelDefinitionDict, allSkillsDict } from "Rules/data";
import { Character, SkillDefinition } from "Rules/types";
import { Children } from "./types";

interface RatingProps {
  title: string;
  value: number;
}

export function Rating({ value, title }: RatingProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-mother-1 circle text-3xl border-4 border-mother-6 flex items-center justify-center">
        <div className="text-center">{value}</div>
      </div>
      <div>{title}</div>
    </div>
  );
}

interface GaugeProps {
  current: number;
  limit: number;
  title: string;
  limitName: string;
}

export function Gauge({ current, limit, title, limitName }: GaugeProps) {
  return (
    <GaugeBase
      title={title}
      valueLeft={current}
      titleLeft="Current"
      valueRight={limit}
      titleRight={limitName}
    />
  );
}

interface GaugeBaseProps {
  title: string;
  valueLeft: number;
  titleLeft: string;
  valueRight: number;
  titleRight: string;
}

export function GaugeBase({
  title,
  valueLeft,
  titleLeft,
  valueRight,
  titleRight,
}: GaugeBaseProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-center">{title}</div>
      <div className="bg-mother-1 rounded-3xl text-3xl border-4 border-mother-6 flex items-center">
        <div className="w-16 text-center">{valueLeft}</div>
        <div className="h-10 w-1 bg-mother-6 mx-3 diagonalRising" />
        <div className="w-16 text-center">{valueRight}</div>
      </div>
      <div className="flex text-mother-4 gap-8">
        <div>{titleLeft}</div>
        <div>{titleRight}</div>
      </div>
    </div>
  );
}

interface SkillProps {
  skill: SkillDefinition;
  onClick?(): void;
}

export function Skill({ skill, onClick }: SkillProps) {
  const levelDefinition = allSkillLevelDefinitionDict[skill.level];
  const cursor = !!onClick ? "cursor-pointer" : "cursor-default";
  return (
    <span
      onClick={onClick ?? (() => {})}
      className={`rounded-lg border-2 bg-mother-5 text-mother-1 border-mother-5 text-lg ${cursor}`}
    >
      <span className="inline-block px-1 rounded-md bg-mother-1 text-mother-5">
        +{levelDefinition.bonus}
      </span>
      <span className="px-2">{skill.name}</span>
    </span>
  );
}

export function SkillInTraining({
  character,
  onClick,
}: ReadCharacter & { onClick?(): void }) {
  const definition = allSkillsDict[character.skillInProgress!];
  const cursor = !!onClick ? "cursor-pointer" : "cursor-default";
  return (
    <span
      onClick={onClick ?? (() => {})}
      className={`rounded-lg border-2 bg-mother-5 text-mother-1 border-mother-5 text-lg ${cursor}`}
    >
      <span className="inline-block px-1 rounded-md bg-mother-1 text-mother-5">
        {character.skillTrainingYearsRemaining}Y:
        {character.skillTrainingMonthsRemaining}M
      </span>
      <span className="px-2">{definition.name}</span>
    </span>
  );
}

interface BlockWithTitleProps extends Children {
  title: string;
}

export function BlockWithTitle({ title, children }: BlockWithTitleProps) {
  return (
    <div className="rounded-xl bg-mother-4 text-mother-1 flex flex-col gap-2 pb-2">
      <div className="rounded-3xl bg-mother-6 text-center relative">
        {title}
      </div>
      <div className="px-4 text-base">
        <div className="flex flex-col gap-1">{children}</div>
      </div>
    </div>
  );
}

interface SelectableBlockWithTitleProps extends BlockWithTitleProps {
  selected: boolean;
  onClick(): void;
}

export function SelectableBlockWithTitle({
  title,
  selected,
  children,
  onClick,
}: SelectableBlockWithTitleProps) {
  const classes = selected ? "bg-mother-6" : "bg-mother-1";
  return (
    <div
      onClick={onClick}
      className="rounded-xl bg-mother-4 text-mother-1 flex flex-col gap-2 pb-2 cursor-pointer"
    >
      <div className="rounded-3xl bg-mother-6 text-center relative">
        <div
          className={`circle-small ${classes} absolute left-0.5 top-0.5 border-2 border-mother-1`}
        />
        {title}
      </div>
      <div className="px-4 text-base">
        <div className="flex flex-col gap-1">{children}</div>
      </div>
    </div>
  );
}
