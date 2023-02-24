import { Block, Button, Divider, Tag, Title } from "../Atoms";

export function Weapons() {
  return (
    <Block variant="light">
      <Title>Weapons</Title>
      <Divider />
      <div className="flex justify-center items-center gap-8">
        <Tag variant="dark">Fatigues (AP 2)</Tag>
        <Tag variant="dark">Standard battle dress (AP 7)</Tag>
      </div>
      <div className="flex justify-center items-center gap-8">
        <Button>Add weapon</Button>
      </div>
    </Block>
  );
}
