import { Block, Button, Divider, Progress, Title } from "UI/Atoms";
import { Weapon as WeaponType } from "Rules/types";
import { ReadBaseChar, SetMode } from "./types";
import { Log } from "Session/types";

export function Weapons({
  character,
  setMode,
  log,
}: ReadBaseChar & SetMode & Log) {
  return (
    <Block variant="light">
      <Title>Weapons</Title>
      <Divider />
      <div className="flex flex-wrap justify-center items-center gap-4">
        {character.weapons.map((w) => (
          <Weapon
            key={w.id}
            weapon={w}
            onTitleClick={() => setMode({ mode: "ViewWeapon", weaponId: w.id })}
            log={log}
          />
        ))}
      </div>
      <div className="flex justify-center items-center gap-8 mt-4">
        <Button
          onClick={() => {
            setMode({ mode: "AddWeapon" });
          }}
        >
          Add weapon
        </Button>
      </div>
    </Block>
  );
}

interface WeaponProps extends Log {
  weapon: WeaponType;
  onTitleClick(): void;
}

function Weapon({ weapon, onTitleClick, log }: WeaponProps) {
  const hasAmmo = weapon.magazineSize !== null;
  const justify = hasAmmo ? "justify-between" : "justify-center";
  return (
    <div className="p-4 rounded-xl bg-mother-2 flex flex-col gap-1">
      <div
        className="rounded-3xl bg-mother-6 text-mother-1 text-center cursor-pointer hover:bg-mother-5"
        onClick={onTitleClick}
      >
        {weapon.weaponType}
      </div>
      <div className="">
        <span className="inline-block w-16">Damage</span>
        <span>{weapon.damageString}</span>
      </div>
      <div className="">
        <span className="inline-block w-16">Range</span>
        <span>{weapon.weaponRange}</span>
      </div>
      <div className={`flex ${justify} gap-2`}>
        {hasAmmo && (
          <Progress
            current={weapon.shots || 0}
            max={weapon.magazineSize || 1}
          />
        )}
        <div
          onClick={() => log({ content: () => <span>attack!</span> })}
          className="px-4 py-1 rounded-3xl bg-mother-6 text-mother-1"
        >
          Attack
        </div>
      </div>
    </div>
  );
}
