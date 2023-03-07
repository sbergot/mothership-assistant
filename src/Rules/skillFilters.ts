import { toDict } from "Services/services";
import { allSkillsDict } from "./data";
import { SkillDefinition, SkillType, SkillLevel } from "./types";

export type SkillFilter = (s: SkillDefinition) => boolean;

export function isPrerequisiteOk(selectedSkills: SkillType[]): SkillFilter {
  const selectedDict = toDict(selectedSkills, (s) => s);
  return (s: SkillDefinition) => {
    const { prerequisites } = allSkillsDict[s.key];
    if (prerequisites.length === 0) {
      return true;
    }
    return prerequisites.some((p) => !!selectedDict[p]);
  };
}

export function isNotSelected(selectedSkills: SkillType[]): SkillFilter {
  const selectedDict = toDict(selectedSkills, (s) => s);
  return (s: SkillDefinition) => {
    return !selectedDict[s.key];
  };
}

export function isSkillLevel(level: SkillLevel): SkillFilter {
  return (s: SkillDefinition) => s.level === level;
}

export function and(cb1: SkillFilter, cb2: SkillFilter): SkillFilter {
  return (s: SkillDefinition) => cb1(s) && cb2(s);
}

export function or(cb1: SkillFilter, cb2: SkillFilter): SkillFilter {
  return (s: SkillDefinition) => cb1(s) || cb2(s);
}

export function never(s: SkillDefinition) {
  return false;
}

export function always(s: SkillDefinition) {
  return true;
}