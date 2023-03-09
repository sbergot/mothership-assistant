import { Children } from "./types";

interface ButtonIconProps extends Children {
  onClick(): void;
  disabled?: boolean;
}

export function ButtonIcon({ onClick, disabled, children }: ButtonIconProps) {
  const cursor = disabled ? "cursor-not-allowed" : "cursor-pointer";
  const color = disabled ? "text-mother-4 border-mother-4" : "text-mother-6 border-mother-6";
  return (
    <span
      onClick={disabled ? undefined : onClick}
      className={`${cursor} ${color}`}
    >
      {children}
    </span>
  );
}

export function NumberIcon({ n }: { n: number }) {
  return (
    <span className="rounded-full text-mother-1 bg-mother-6 border-2 border-mother-6 normal-case p-2 text-sm flex items-center justify-center w-6 h-6">
      <div>
        x<span className="text-base">{n}</span>
      </div>
    </span>
  );
}

interface IconProps {
  disabled?: boolean;
}

export function MinusIcon({ disabled }: IconProps) {
  const color = disabled ? "text-mother-4 border-mother-4" : "text-mother-6 border-mother-6";

  return (
    <span className={`rounded-full bg-mother-1 border-2 normal-case w-6 h-6 flex items-center justify-center ${color}`}>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
        </svg>
      </div>
    </span>
  );
}

export function PlusIcon({ disabled }: IconProps) {
  const color = disabled ? "text-mother-4 border-mother-4" : "text-mother-6 border-mother-6";

  return (
    <span className={`rounded-full bg-mother-1 border-2 normal-case w-6 h-6 flex items-center justify-center ${color}`}>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </div>
    </span>
  );
}
