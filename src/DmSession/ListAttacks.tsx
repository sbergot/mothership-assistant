import { MonsterAttack } from "Rules/types";
import { ReadWriteGame, SetDmMode } from "./types";
import { BlockWithTitle } from "UI/Molecules";
import { ButtonIcon, EditIcon, TrashIcon } from "UI/Icons";
import { deleteInList, updateInList } from "helpers";
import { Button } from "UI/Atoms";
import {
  deNormalizeCriticalType,
  getDamageDescription,
} from "Services/damageServices";

interface Props extends ReadWriteGame, SetDmMode {
  monsterId: string;
}

export function ListAttacks({ game, setGame, setMode, monsterId }: Props) {
  const monster = game.monsters.find((m) => m.id === monsterId);
  if (monster === undefined) {
    throw new Error("could not find monster");
  }

  return (
    <div className="flex flex-col items-center gap-2 mb-8">
      {monster.attacks.map((a) => (
        <ShortAttack
          attack={a}
          onDelete={() =>
            setGame((g) => ({
              ...g,
              monsters: updateInList(g.monsters, monsterId, (m) => ({
                ...m,
                attacks: deleteInList(m.attacks, a.id),
              })),
            }))
          }
          onEdit={() =>
            setMode({ mode: "AddAttack", monsterId, attackId: a.id })
          }
        />
      ))}
      <div className="flex justify-center gap-2">
        <Button
          dark
          rounded
          onClick={() => setMode({ mode: "AddAttack", monsterId })}
        >
          add new
        </Button>
        <Button rounded onClick={() => setMode({ mode: "DmSheet" })}>
          back
        </Button>
      </div>
    </div>
  );
}

interface ShortAttackProps {
  attack: MonsterAttack;
  onDelete(): void;
  onEdit(): void;
}

function ShortAttack({ attack, onDelete, onEdit }: ShortAttackProps) {
  const header = (
    <AttackHeader title={attack.name} onDelete={onDelete} onEdit={onEdit} />
  );
  return (
    <div className="w-64">
      <BlockWithTitle title={header}>
        <div>{attack.name}</div>{" "}
        <div>
          {getDamageDescription(attack.damage)} -{" "}
          {deNormalizeCriticalType(attack.critical)}
        </div>
        {attack.description && <div className="text-xs">{attack.description}</div>}
      </BlockWithTitle>
    </div>
  );
}

interface AttackHeaderProps {
  title: string;
  onDelete(): void;
  onEdit(): void;
}

function AttackHeader({ title, onDelete, onEdit }: AttackHeaderProps) {
  return (
    <div className="text-center relative">
      <div>{title}</div>
      <div className="absolute right-2 top-0">
        <ButtonIcon light onClick={onEdit}>
          <EditIcon />
        </ButtonIcon>
        <ButtonIcon light onClick={onDelete}>
          <TrashIcon />
        </ButtonIcon>
      </div>
    </div>
  );
}
