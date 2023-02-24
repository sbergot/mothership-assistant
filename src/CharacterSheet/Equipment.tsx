import { Block, Button, Divider, Tag, Title } from "../Atoms";

export function Equipment() {
  return (
    <Block variant="light">
      <Title>Equipment</Title>
      <Divider />
      <div className="flex justify-center items-center gap-8">
        <Tag variant="dark">190cr</Tag>
        <Tag variant="dark">Drone</Tag>
        <Tag variant="dark">First aid kit</Tag>
        <Button>Add equipment</Button>
        <Button>Custom item</Button>
      </div>
    </Block>
  );
}
