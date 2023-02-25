import { Block, Button, Divider, Tag, Title } from "../Atoms";
import { Gauge } from "../Molecules";

export function Status() {
  return (
    <Block variant="light">
      <Title>Status report</Title>
      <div className="flex justify-around">
        <Gauge title="Health" limitName="Maximum" current={19} limit={20} />
        <Gauge title="Wounds" limitName="Maximum" current={0} limit={3} />
        <Gauge title="Stress" limitName="Minimum" current={2} limit={2} />
      </div>
      <Divider />
      <Title>Warning!</Title>
      <div className="flex flex-row-wrap justify-center gap-2">
        <Tag variant="dark">Trauma response</Tag>
        <Tag variant="dark">Coward</Tag>
        <Tag variant="dark">Deflated</Tag>
        <Button>Add condition</Button>
      </div>
    </Block>
  );
}
