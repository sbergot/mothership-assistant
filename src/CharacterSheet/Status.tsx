import { Block, Button, Divider, Tag, Title } from "../Atoms";

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

interface GaugeProps {
  current: number;
  limit: number;
  title: string;
  limitName: string
}

function Gauge({ current, limit, title, limitName }: GaugeProps) {
  return <div className="flex flex-col items-center">
    <div className="text-center">{title}</div>
    <div className="bg-mother-1 rounded-3xl text-3xl border-4 border-mother-6 flex items-center">
      <div className="w-16 text-center">{current}</div>
      <div className="h-10 w-1 bg-mother-6 mx-1 diagonalRising" />
      <div className="w-16 text-center">{limit}</div>
    </div>
    <div className="flex text-mother-4 gap-2">
      <div>current</div>
      <div>{limitName}</div>
    </div>
  </div>
}