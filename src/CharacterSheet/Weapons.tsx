import { Block, Button, Divider, Progress, Tag, Title } from "../Atoms";
import { weapons } from "../Data/data";
import { Weapon as WeaponType } from "../types";

export function Weapons() {
  return (
    <Block variant="light">
      <Title>Weapons</Title>
      <Divider />
      <div className="flex justify-center items-center gap-8">
        <Weapon weapon={weapons[0]} />
        <Weapon weapon={{...weapons[1], shots:3}} />
      </div>
      <div className="flex justify-center items-center gap-8 mt-4">
        <Button>Add weapon</Button>
      </div>
    </Block>
  );
}

interface WeaponProps {
  weapon: WeaponType;
}

function Weapon({ weapon }: WeaponProps) {
  const hasAmmo = weapon.magazineSize != null;
  const justify = hasAmmo ? "justify-between" : "justify-center"
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
        {hasAmmo && <Progress current={weapon.shots || 0} max={weapon.magazineSize || 1} />}
        <div className="px-4 py-1 rounded-3xl bg-mother-6 text-mother-1">
          Attack
        </div>
      </div>
    </div>
  );
}
