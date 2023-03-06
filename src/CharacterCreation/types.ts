import { Character, Updater } from "../Rules/types";

export interface StepProps {
  character: Character;
  onConfirm(character: Character): void;
}
