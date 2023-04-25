import { Block, Button, Divider, Title } from "UI/Atoms";
import { ReadCharacter, SetMode } from "./types";

type Props = ReadCharacter & SetMode;

export function ViewPatch({ character, setMode }: Props) {
  function back() {
    setMode({ mode: "CharacterSheet" });
  }

  return (
    <Block variant="light">
      <Title>Patch</Title>
      <Divider />
      <div className="text-center">
        {character.patch}
      </div>
      <Divider />
      <div className="flex justify-center gap-2">
        <Button onClick={back}>Back</Button>
      </div>
    </Block>
  );
}
