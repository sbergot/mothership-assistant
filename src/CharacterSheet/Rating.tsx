interface Props {
  title: string;
  value: number
}

export function Rating({ value, title }: Props) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-mother-1 circle text-3xl border-4 border-mother-6 flex items-center justify-center">
      <div className="text-center">{value}</div>
      </div>
      <div>{title}</div>
    </div>
  );
}
