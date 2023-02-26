import { Character, Updater } from "../types";

export interface StepProps {
  character: Character;
  onConfirm(character: Character): void;
}
