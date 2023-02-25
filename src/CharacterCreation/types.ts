import { Character, Updater } from "../types";

export interface StepProps {
  character: Character;
  setCharacter: Updater;
  onConfirm(): void;
}
