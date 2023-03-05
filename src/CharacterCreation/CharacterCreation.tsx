import { useState } from "react";
import { initCharacter } from "../Services/characterServices";
import { Character } from "../types";
import { GainStress } from "./GainStress";
import { NoteTraumaResponse } from "./NoteTraumaResponse";
import { RollEquipment } from "./RollEquipment";
import { RollHealth } from "./RollHealth";
import { RollSaves } from "./RollSaves";
import { RollStats } from "./RollStats";
import { SelectClass } from "./SelectClass";
import { SelectSkills } from "./SelectSkills";
import { StepProps } from "./types";

const Steps: ((props: StepProps) => JSX.Element)[] = [
  RollStats,
  RollSaves,
  SelectClass,
  RollHealth,
  GainStress,
  NoteTraumaResponse,
  SelectSkills,
  RollEquipment,
];

export function CharacterCreation() {
  const [character, setCharacter] = useState(initCharacter());
  const [step, setStep] = useState(0);
  function next(character: Character) {
    setCharacter(character);
    setStep((i) => i + 1);
  }
  const Step = Steps[step];
  if (Step === undefined) {
    return <div>error</div>;
  }
  return <Step character={character} onConfirm={next} />;
}
