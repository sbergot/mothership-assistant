import { Block, Button, Title } from "UI/Atoms";
import { ReadWriteGame, SetDmMode } from "./types";
import { useState } from "react";

interface Props extends ReadWriteGame, SetDmMode {}

interface Selection {
  type: "npc" | "monster";
  id: string;
}

export function DealDamage({ game, setGame, setMode }: Props) {
  const { npcs, monsters } = game;
  const [selection, setSelection] = useState<Selection | null>(null);
  return (
    <Block variant="light">
      <Title>Select target</Title>
      <div>
        {npcs.map((npc) => (
          <Button
            light={selection?.id !== npc.id}
            onClick={() => {
              setSelection({ type: "npc", id: npc.id });
            }}
          >
            {npc.name}
          </Button>
        ))}
        {monsters.map((m) => (
          <Button
            light={selection?.id !== m.id}
            onClick={() => {
              setSelection({ type: "monster", id: m.id });
            }}
          >
            {m.name}
          </Button>
        ))}
      </div>
      <div className="flex justify-center gap-2">
        <Button
          dark
          rounded
          disabled={selection === null}
          onClick={() => {
            setMode({ mode: "DmSheet" });
          }}
        >
          take damage
        </Button>
        <Button
          rounded
          onClick={() => {
            setMode({ mode: "DmSheet" });
          }}
        >
          back
        </Button>
      </div>
    </Block>
  );
}
