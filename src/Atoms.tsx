import { Children } from "./UITypes";

type ColorVariant =  "light" | "dark";

interface Props extends Children {
  variant: ColorVariant
}

const variantColors: Record<ColorVariant, string> = {
  dark: "bg-mother-4 text-mother-1 border-mother-4",
  light: "bg-mother-3 text-mother-4 border-mother-3"
}

export function Block({ children, variant }: Props) {
  return (
    <div className={`p-4 rounded-3xl border-2 my-4 ${variantColors[variant]}`}>
      {children}
    </div>
  );
}

export function Tag({ children, variant }: Props) {
  return (
    <span className={`py-1 px-2 rounded-lg border-2 ${variantColors[variant]}`}>
      {children}
    </span>
  );
}

export function Title({ children }: Children) {
  return <div className="text-center text-xl mb-2">{children}</div>
}

export function Divider() {
  return <div className="bg-mother-2 w-1/2 h-0.5 mx-auto my-2" />
}

export function Button({ children }: Children) {
  return (
    <span className="py-1 px-2 rounded-lg border-2 bg-mother-3 text-mother-4 border-mother-4 cursor-pointer hover:bg-mother-4 hover:text-mother-1 hover:border-mother-1 transition-colors">
      {children}
    </span>
  );
}
