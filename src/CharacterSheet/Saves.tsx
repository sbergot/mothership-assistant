import { Block, Title } from "../Atoms";
import { Rating } from "./Rating";

export function Saves() {
  return (
    <Block variant="light">
      <Title>Saves</Title>
      <div className="flex justify-center gap-8">
        <Rating title="Sanity" value={21} />
        <Rating title="Fear" value={37} />
        <Rating title="Body" value={24} />
      </div>
    </Block>
  );
}
