import { DeathCheckResult } from "Rules/types";

function getDescription(rollValue: number) {
  if (rollValue < 6) {
    return "You have died. Roll up a new character.";
  }
  if (rollValue < 8) {
    return "You are comatose. Only extraordinary measures will return you to the waking world.";
  }
  if (rollValue < 10) {
    return "You are unconscious and dying. You will die in 1d5 rounds without intervention.";
  }

  return "You are unconscious. You will wake up in 2d10 minutes. Permanently reduce your Maximum Health by 1d5.";
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
