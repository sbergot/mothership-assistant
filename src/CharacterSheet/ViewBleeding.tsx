import { Block, Button, Divider, Title } from "UI/Atoms";
import { ReadWriteCharacter, SetMode } from "./types";
import { Rating } from "UI/Molecules";

type Props = ReadWriteCharacter & SetMode;

export function ViewBleeding({ character, setCharacter, setMode }: Props) {
  function back() {
    setMode({ mode: "CharacterSheet" });
  }

  return (
    <Block variant="light">
      <Title>Bleeding</Title>
      <Divider />
      <div className="text-center">
        Take 1 damage per bleeding level every round
      </div>
      <div className="mt-2">
        <Rating
          title="Level"
          value={character.bleeding}
          onUpdate={(v) => setCharacter((c) => ({ ...c, bleeding: v }))}
        />
      </div>

      <Divider />
      <div className="flex justify-center gap-2">
        <Button onClick={back}>Back</Button>
      </div>
    </Block>
  );
}
