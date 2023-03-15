import { WithId } from "Rules/types";
import { uuidv4 } from "Services/services";

export function formatCredits(c: number): string {
  if (Math.abs(c) >= 1000) {
    return `${c/1000}kcr`
  }
  return `${c}cr`
}

export function clone<T extends WithId>(e: T): T {
  return {...e, id: uuidv4()};
}
