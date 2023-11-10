import { DeathCheckResult } from "Rules/types";

function getDescription(rollValue: number) {
  if (rollValue < 1) {
    return "You are unconscious. You will wake up in 2d10 minutes. Permanently reduce your Maximum Health by 1d5.";
  }
  if (rollValue < 3) {
    return "You are unconscious and dying. You will die in 1d5 rounds without intervention.";
  }
  if (rollValue < 5) {
    return "You are comatose. Only extraordinary measures will return you to the waking world.";
  }
  return "You have died. Roll up a new character.";
}

export function ShowDeathCheck({ rollValue }: DeathCheckResult) {
  let description = getDescription(rollValue);
  return (
    <div>
      <div>Death check: {rollValue}</div>
      <div>{description}</div>
    </div>
  );
}
