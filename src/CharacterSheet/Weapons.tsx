import { Block, Button, Divider, Progress, Title } from "UI/Atoms";
import { Weapon as WeaponType } from "Rules/types";
import { ReadWriteBaseChar, SetMode, WriteBaseChar } from "./types";
import { FireIcon } from "UI/Icons";
import { spendAmmoForWeapon } from "Services/characterServices";
import { Log } from "Messages/types";
import { rollDamages } from "Services/damageServices";

export function Weapons({
  character,
  setCharacter,
  setMode,
  log
}: ReadWriteBaseChar & SetMode & Log) {
  return (
    <Block variant="light">
      <Title>Weapons</Title>
      <Divider />
      <div className="flex flex-wrap justify-center items-center gap-4">
        {character.weapons.map((w) => (
          <Weapon
            key={w.id}
            weapon={w}
            setMode={setMode}
            setCharacter={setCharacter}
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

interface WeaponProps extends SetMode, WriteBaseChar, Log {
  weapon: WeaponType;
}

function Weapon({ weapon, setCharacter, setMode, log }: WeaponProps) {
  const hasAmmo = weapon.magazineSize !== null;
  const justify = hasAmmo ? "justify-between" : "justify-center";
  return (
    <div className="p-4 rounded-xl bg-mother-2 flex flex-col gap-1">
      <div
        className="rounded-3xl bg-mother-6 text-mother-1 text-center cursor-pointer hover:bg-mother-5"
        onClick={() => setMode({ mode: "ViewWeapon", weaponId: weapon.id })}
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
        <Button
          onClick={() => setMode({ mode: "RollAttack", weaponId: weapon.id })}
          disabled={hasAmmo && weapon.shots === 0}
          dark
          rounded
          noBorder
        >
          Attack
        </Button>
        <Button
          dark
          rounded
          noBorder
          onClick={() => {
            setCharacter((c) => spendAmmoForWeapon(c, weapon.id));
            log({
              type: "DamageMessage",
              props: { ...rollDamages(weapon.damage[0], weapon.critical, false) },
            });
          }}
        >
          <FireIcon />
        </Button>
      </div>
    </div>
  );
}
