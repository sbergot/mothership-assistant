import { RoundButton } from "UI/Atoms";
import { Modes, SetDmMode } from "./types";
import { DiceIcon, GroupIcon, TableIcon } from "UI/Icons";

interface Props extends SetDmMode {
  mode: Modes;
}

export function DmSessionTabs({ mode, setMode }: Props) {
  return (
    <div className="flex justify-end gap-2 mb-2">
      <RoundButton
        light={mode.mode !== "DmTables"}
        onClick={() => {
          setMode({ mode: "DmTables" });
        }}
      >
        <TableIcon />
      </RoundButton>
      <RoundButton
        light={mode.mode !== "DmSheet"}
        onClick={() => {
          setMode({ mode: "DmSheet" });
        }}
      >
        <GroupIcon />
      </RoundButton>
      <RoundButton
        light={mode.mode !== "DmRoll"}
        onClick={() => {
          setMode({ mode: "DmRoll" });
        }}
      >
        <DiceIcon />
      </RoundButton>
    </div>
  );
}
