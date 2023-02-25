import { useState } from "react";
import { initCharacter } from "../Services/characterServices";
import { RollSaves } from "./RollSaves";
import { RollStats } from "./RollStats";
import { StepProps } from "./types";

const Steps: ((props: StepProps) => JSX.Element)[] = [RollStats, RollSaves];  

export function CharacterCreation() {
  const [character, setCharacter] = useState(initCharacter())
  const [step, setStep] = useState(0);
  function next() {
    setStep(i => i + 1);
  }
  const Step = Steps[step];
  if (Step === undefined) { return <div>error</div> }
  return <Step character={character} setCharacter={setCharacter} onConfirm={next} />;
}
