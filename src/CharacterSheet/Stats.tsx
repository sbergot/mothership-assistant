import { Block, Title } from "../Atoms";
import { Rating } from "./Rating";

export function Stats() {
  return (
    <Block variant="light">
      <Title>Stats</Title>
      <div className="flex justify-center gap-8">
        <Rating title="Strength" value={34} />
        <Rating title="Speed" value={39} />
        <Rating title="Intellect" value={42} />
        <Rating title="Combat" value={43} />
      </div>
    </Block>
  );
}
