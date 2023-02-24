interface GaugeProps {
  current: number;
  limit: number;
  title: string;
  limitName: string
}

export function Gauge({ current, limit, title, limitName }: GaugeProps) {
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