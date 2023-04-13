import { Block, Button, Title } from "UI/Atoms";
import { ReadWriteGame } from "./types";

interface Props extends ReadWriteGame {}

export function DealDamage({ game, setGame }: Props) {
  const { npcs, monsters } = game;
  return (
    <Block variant="light">
      <Title>Select target</Title>
      <div>
        {npcs.map((npc) => (
          <Button onClick={() => {}}>{npc.name}</Button>
        ))}
        {monsters.map((m) => (
          <Button onClick={() => {}}>{m.name}</Button>
        ))}
      </div>
    </Block>
  );
}
