import { Block, Button, Divider, Title } from "UI/Atoms";
import { ReadCharacter, SetMode } from "./types";

type Props = ReadCharacter & SetMode;

export function ViewTrinket({ character, setMode }: Props) {
  function back() {
    setMode({ mode: "CharacterSheet" });
  }

  return (
    <Block variant="light">
      <Title>Trinket</Title>
      <Divider />
      <div className="text-center">
        {character.trinket}
      </div>
      <Divider />
      <div className="flex justify-center gap-2">
        <Button onClick={back}>Back</Button>
      </div>
    </Block>
  );
}
