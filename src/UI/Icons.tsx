import { Children } from "./types";

interface ButtonIconProps extends Children {
  onClick(): void;
  disabled?: boolean;
  light?: boolean;
}

export function ButtonIcon({
  onClick,
  disabled,
  light,
  children,
}: ButtonIconProps) {
  const cursor = disabled ? "cursor-not-allowed" : "cursor-pointer";
  const color = disabled
    ? "text-mother-4 border-mother-4"
    : light
    ? "text-mother-1 border-mother-1"
    : "text-mother-6 border-mother-6";
  return (
    <span
      onClick={disabled ? undefined : onClick}
      className={`${cursor} ${color} inline-block active:scale-90`}
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
  const color = disabled
    ? "text-mother-4 border-mother-4"
    : "text-mother-6 border-mother-6";

  return (
    <span
      className={`rounded-full bg-mother-1 border-2 normal-case w-6 h-6 flex items-center justify-center ${color}`}
    >
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
  const color = disabled
    ? "text-mother-4 border-mother-4"
    : "text-mother-6 border-mother-6";

  return (
    <span
      className={`rounded-full bg-mother-1 border-2 normal-case w-6 h-6 flex items-center justify-center ${color}`}
    >
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

export function TrashIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="inline-block w-6 h-6 mb-1"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
      />
    </svg>
  );
}

export function CopyIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="inline-block w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
      />
    </svg>
  );
}
