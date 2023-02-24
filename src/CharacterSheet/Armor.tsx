import { Block, Button, Divider, Tag, Title } from "../Atoms";

export function Armor() {
  return (
    <Block variant="light">
      <Title>Armor</Title>
      <Divider />
      <div className="flex justify-center items-center gap-8">
        <Tag variant="dark">Fatigues (AP 2)</Tag>
        <Tag variant="dark">Standard battle dress (AP 7)</Tag>
        <Button>Add armor</Button>
      </div>
    </Block>
  );
}
