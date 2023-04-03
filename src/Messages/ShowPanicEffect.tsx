import { stressTable } from "Rules/data";
import { PanicEffect } from "Rules/types";

export function ShowPanicEffect({ result }: PanicEffect) {
  const effect = stressTable[result];
  return (
    <div>
      {effect.name} - {effect.description}
    </div>
  );
}
