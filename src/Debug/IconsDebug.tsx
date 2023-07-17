import { Divider, Title } from "UI/Atoms";
import { Table } from "UI/Organisms/Table";
import { meleeWeaponsColumns, sortBy, weaponsColumns } from "./columns";
import { allWeapons } from "Rules/Data/weapons";
import { AllowedIcon, ChatIcon, CheckIcon, ChevronDownIcon, ChevronRightIcon, ClockIcon, CopyIcon, DangerIcon, DiceIcon, EditIcon, EyeIcon, EyeSlashIcon, FireIcon, ForbiddenIcon, GroupIcon, MinusIcon, NewsIcon, PauseIcon, PlayIcon, PlusIcon, ResetIcon, TableIcon, TrashIcon, XIcon } from "UI/Icons";

export function IconsDebug() {
  return (
    <div className="text-base">
      <Title>icons debug</Title>
      <div className="flex flex-wrap gap-8">
      <div><MinusIcon /> minus</div>
      <div><PlusIcon /> plus</div>
      <div><TrashIcon /> trash</div>
      <div><CopyIcon /> copy</div>
      <div><ChatIcon /> chat</div>
      <div><XIcon /> x</div>
      <div><DangerIcon /> danger</div>
      <div><EyeIcon /> eye</div>
      <div><EyeSlashIcon /> eye slash</div>
      <div><NewsIcon /> news</div>
      <div><GroupIcon /> group</div>
      <div><DiceIcon /> dice</div>
      <div><ChevronRightIcon /> chevron right</div>
      <div><ChevronDownIcon /> chevron down</div>
      <div><ForbiddenIcon /> forbidden</div>
      <div><AllowedIcon /> allowed</div>
      <div><TableIcon /> table</div>
      <div><ClockIcon /> clock</div>
      <div><PlayIcon /> play</div>
      <div><PauseIcon /> pause</div>
      <div><ResetIcon /> reset</div>
      <div><EditIcon /> edit</div>
      <div><FireIcon /> fire</div>
      <div><CheckIcon /> check</div>
      </div>
    </div>
  );
}
