import { Block, Button, Divider, Progress, Title } from "UI/Atoms";
import { Weapon as WeaponType } from "Rules/types";
import { ReadCharacter, SetMode } from "./types";

export function Weapons({ character, setMode }: ReadCharacter & SetMode) {
  return (
    <Block variant="light">
      <Title>Weapons</Title>
      <Divider />
      <div className="flex flex-wrap justify-center items-center gap-4">
        {character.weapons.map((w) => (
          <Weapon key={w.id} weapon={w} />
        ))}
      </div>
      <div className="flex justify-center items-center gap-8 mt-4">
        <Button onClick={() => { setMode({ mode: "AddWeapon" }) }}>Add weapon</Button>
      </div>
    </Block>
  );
}

interface WeaponProps {
  weapon: WeaponType;
}

function Weapon({ weapon }: WeaponProps) {
  const hasAmmo = weapon.magazineSize != null;
  const justify = hasAmmo ? "justify-between" : "justify-center";
  return (
    <div className="p-4 rounded-xl bg-mother-2 flex flex-col gap-1">
      <div className="rounded-3xl bg-mother-6 text-mother-1 text-center">
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
        <div className="px-4 py-1 rounded-3xl bg-mother-6 text-mother-1">
          Attack
        </div>
      </div>
    </div>
  );
}
