import { ReadCharacter } from "CharacterSheet/types";
import { allSkillLevelDefinitionDict, allSkillsDict } from "Rules/Data/skills";
import { SkillDefinition } from "Rules/types";
import { Children } from "./types";
import {
  ButtonIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  DiceIcon,
  EditIcon,
  EyeIcon,
  EyeSlashIcon,
  TrashIcon,
} from "./Icons";
import { useState } from "react";
import { Title } from "./Atoms";

interface RatingProps {
  title: string;
  value: number;
  onUpdate?(value: number): void;
  onRoll?: React.MouseEventHandler<HTMLSpanElement>;
}

export function Rating({ value, title, onUpdate, onRoll }: RatingProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-mother-1 circle text-3xl border-4 border-mother-6 flex items-center justify-center">
        <input
          type="number"
          className="text-center outline-none w-9 bg-mother-1"
          value={value}
          disabled={!onUpdate}
          onChange={
            onUpdate ? (e) => onUpdate(parseInt(e.target.value)) : undefined
          }
        />
      </div>
      <div>
        {title}
        {onRoll && (
          <ButtonIcon onClick={onRoll}>
            <DiceIcon />
          </ButtonIcon>
        )}
      </div>
    </div>
  );
}

interface SelectableRatingProps {
  title: string;
  value: number;
  selected: boolean;
  onClick(): void;
}

export function SelectableRating({
  value,
  title,
  selected,
  onClick,
}: SelectableRatingProps) {
  const color = selected ? "bg-mother-3" : "bg-mother-1";
  return (
    <div className="flex flex-col items-center" onClick={onClick}>
      <div
        className={`${color} hover:bg-mother-3 circle text-3xl border-4 border-mother-6 flex items-center justify-center cursor-pointer`}
      >
        {value}
      </div>
      <div>{title}</div>
    </div>
  );
}

interface GaugeProps {
  current: number;
  onChange?(n: number): void;
  limit: number;
  title: string;
  limitName: string;
  onChangeLimit?(n: number): void;
}

export function Gauge({
  current,
  onChange,
  limit,
  title,
  limitName,
  onChangeLimit,
}: GaugeProps) {
  return (
    <GaugeBase
      title={title}
      valueLeft={current}
      titleLeft="Current"
      onChangeLeft={onChange}
      valueRight={limit}
      titleRight={limitName}
      onChangeRight={onChangeLimit}
    />
  );
}

interface GaugeBaseProps {
  title: string;
  valueLeft: number;
  titleLeft: string;
  onChangeLeft?(n: number): void;
  valueRight: number;
  titleRight: string;
  onChangeRight?(n: number): void;
}

export function GaugeBase({
  title,
  valueLeft,
  titleLeft,
  onChangeLeft,
  valueRight,
  titleRight,
  onChangeRight,
}: GaugeBaseProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-center">{title}</div>
      <div className="bg-mother-1 rounded-3xl text-3xl border-4 border-mother-6 flex items-center">
        <input
          type="number"
          disabled={onChangeLeft === undefined}
          className="w-12 ml-5 mr-1 outline-none text-center bg-mother-1"
          value={valueLeft}
          onChange={(e) => onChangeLeft?.(parseInt(e.target.value))}
        />
        <div className="h-10 w-1 bg-mother-6 mx-3 diagonalRising" />
        <input
          type="number"
          disabled={onChangeRight === undefined}
          className="w-12 ml-2 mr-3 outline-none text-center bg-mother-1"
          value={valueRight}
          onChange={(e) => onChangeRight?.(parseInt(e.target.value))}
        />
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
  selected?: boolean;
  onClick?(): void;
}

export function Skill({ skill, selected, onClick }: SkillProps) {
  const levelDefinition = allSkillLevelDefinitionDict[skill.level];
  const cursor = !!onClick ? "cursor-pointer" : "cursor-default";
  const leftPart = selected ? "✓" : `+${levelDefinition.bonus}`;
  return (
    <span
      onClick={onClick ?? (() => {})}
      className={`rounded-lg border-2 bg-mother-5 text-mother-1 border-mother-5 text-lg ${cursor}`}
    >
      <span className="inline-block px-1 rounded-md bg-mother-1 text-mother-5 w-10 text-center">
        {leftPart}
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
  title: React.ReactNode;
  light?: boolean;
}

export function BlockWithTitle({
  light,
  title,
  children,
}: BlockWithTitleProps) {
  const colors = light
    ? "bg-mother-2 text-mother-6"
    : "bg-mother-4 text-mother-1";
  return (
    <div className={`rounded-xl ${colors} flex flex-col gap-2 pb-2`}>
      <div className="rounded-3xl bg-mother-6 text-mother-1 text-center relative">
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
  const header = (
    <div className="cursor-pointer" onClick={onClick}>
      <div
        className={`circle-small ${classes} absolute left-0.5 top-0.5 border-2 border-mother-1`}
      />
      {title}
    </div>
  );
  return <BlockWithTitle title={header}>{children}</BlockWithTitle>;
}

interface EntryHeaderProps {
  title: string;
  visible: boolean;
  onToggleVisibility(): void;
  onDelete(): void;
  setTitle(s: string): void;
}

export function EntryHeader({
  title,
  visible,
  onToggleVisibility,
  onDelete,
  setTitle,
}: EntryHeaderProps) {
  const [nameEditable, setNameEditable] = useState(false);
  return (
    <div className="flex relative">
      {nameEditable ? (
        <input
          className="text-mother-5 text-sm w-40 mx-1 my-0.5"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      ) : (
        <div className="w-40 truncate whitespace-nowrap">{title}</div>
      )}
      <div className="absolute right-2 top-0">
        <ButtonIcon light onClick={() => setNameEditable((e) => !e)}>
          {nameEditable ? <CheckIcon /> : <EditIcon />}
        </ButtonIcon>
        <ButtonIcon light onClick={onToggleVisibility}>
          {visible ? <EyeIcon /> : <EyeSlashIcon />}
        </ButtonIcon>
        <ButtonIcon light onClick={onDelete}>
          <TrashIcon />
        </ButtonIcon>
      </div>
    </div>
  );
}

interface FoldableSectionProps extends Children {
  title: string;
}

export function FoldableSection({ title, children }: FoldableSectionProps) {
  const [opened, setOpened] = useState(true);
  return (
    <div className="flex flex-col gap-2">
      <div className="text-center relative">
        <div className="absolute left-2 top-0">
          <ButtonIcon onClick={() => setOpened((o) => !o)}>
            {opened ? <ChevronDownIcon /> : <ChevronRightIcon />}
          </ButtonIcon>
        </div>
        <Title>{title}</Title>
      </div>
      {opened && (
        <div className="px-4 text-base">
          <div className="flex flex-col gap-1">{children}</div>
        </div>
      )}
    </div>
  );
}
