import { Children } from "./UITypes";

export function Block({ children }: Children) {
  return (
    <div className="p-4 bg-mother-3 text-mother-1 rounded-3xl">
      {children}
    </div>
  );
}

export function Input() {
  return <input className="p-2 w-full rounded-lg text-mother-3 uppercase"></input>
}