import { ButtonIcon, MinusIcon, PlusIcon, NumberIcon } from "UI/Icons";

export interface Column<T> {
  name: string;
  className?: string;
  cell(props: { elt: T }): JSX.Element;
}

interface TableProps<T> {
  columns: Column<T>[];
  rows: T[];
}

export function Table<T>({ columns, rows }: TableProps<T>) {
  return (
    <table className="w-full border-2">
      <colgroup>
        {columns.map((c) => (
          <col key={c.name} className={c.className} />
        ))}
      </colgroup>
      <thead className="text-mother-1 bg-mother-6 border-2 border-mother-6">
        <tr>
          {columns.map((col) => (
            <th key={col.name}>{col.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            {columns.map((col) => {
              const Cell = col.cell;
              return (
                <td
                  key={col.name + i}
                  about={col.name + i}
                  className="border-2 border-mother-6 bg-mother-1 px-2"
                >
                  <Cell key={col.name} elt={r} />
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

interface CounterProps {
  amount: number;
  onSelect(): void;
  onDeselect(): void;
}

export function Counter({ amount, onDeselect, onSelect }: CounterProps) {
  const empty = amount === 0;
  return (
    <div className="flex gap-3 justify-center">
      <ButtonIcon onClick={onDeselect} disabled={empty}>
        <MinusIcon disabled={empty} />
      </ButtonIcon>
      {empty && (
        <ButtonIcon onClick={onSelect}>
          <PlusIcon />
        </ButtonIcon>
      )}
      {!empty && (
        <ButtonIcon onClick={onSelect}>
          <NumberIcon n={amount} />
        </ButtonIcon>
      )}
    </div>
  );
}
