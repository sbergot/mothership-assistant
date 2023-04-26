import { useState } from "react";
import { Children } from "./types";
import { DangerIcon } from "./Icons";

type ColorVariant = "light" | "dark" | "bright";

const variantColors: Record<ColorVariant, string> = {
  dark: "bg-mother-5 border-mother-5 text-mother-1",
  light: "bg-mother-3 border-mother-3 text-mother-6",
  bright: "bg-mother-1 border-mother-1 text-mother-6",
};

interface Props extends Children {
  variant: ColorVariant;
  small?: boolean;
}

export function Block({ children, variant, small }: Props) {
  const size = small ? "p-1 rounded-lg" : "p-4 rounded-3xl";
  return (
    <div className={`${size} border-2 w-full ${variantColors[variant]}`}>
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

interface TitleProps extends Children {
  variant?: "dark" | "light";
}

export function Title({ children, variant }: TitleProps) {
  const color =
    (variant ?? "dark") === "dark" ? "text-mother-5" : "text-mother-1";
  return <div className={`text-center text-xl mb-2 ${color}`}>{children}</div>;
}

export function Divider() {
  return <div className="bg-mother-4 w-1/2 h-0.5 mx-auto my-2" />;
}

export function DividerOr() {
  return (
    <div className="flex justify-center items-center mx-auto gap-4">
      <div className="bg-mother-4 w-24 h-0.5 my-2" />
      <div>or</div>
      <div className="bg-mother-4 w-24 h-0.5 my-2" />
    </div>
  );
}

interface ButtonStyle {
  disabled?: boolean;
  rounded?: boolean;
  dark?: boolean;
  light?: boolean;
  noBorder?: boolean;
}

interface ButtonProps extends Children, ButtonStyle {
  onClick(): void;
}

export function Button({
  children,
  onClick,
  dark,
  light,
  disabled,
  rounded,
  noBorder,
}: ButtonProps) {
  let colors = dark
    ? "bg-mother-6 text-mother-1 hover:bg-mother-5"
    : "bg-mother-3 border-mother-5 hover:bg-mother-4";

  colors = light
    ? "bg-mother-1 text-mother-6 border-mother-6 hover:bg-mother-3"
    : colors;
  colors = disabled ? "bg-mother-4 text-mother-1" : colors;

  const cursor = disabled
    ? "cursor-not-allowed"
    : "cursor-pointer active:scale-90";
  const corners = rounded ? "px-4 rounded-3xl" : "px-2 rounded-lg";
  const border = noBorder ? "" : "border-2";
  return (
    <span
      onClick={disabled ? undefined : onClick}
      className={`py-1 transition-all ${border} ${colors} ${cursor} ${corners}`}
    >
      {children}
    </span>
  );
}

interface ProgressProps {
  current: number;
  max: number;
}

export function Progress({ current, max }: ProgressProps) {
  const radius = 14;
  const circumference = radius * 2 * Math.PI;
  const percent = current / max;
  const offset = 16;
  return (
    <div className="inline-flex items-center justify-center">
      <svg className="w-8 h-8">
        <circle
          className="text-mother-3"
          strokeWidth="4"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={offset}
          cy={offset}
        />
        <circle
          className="text-mother-5 -rotate-90 origin-center"
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - percent * circumference}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={offset}
          cy={offset}
        />
      </svg>
      <span className="absolute">{current}</span>
    </div>
  );
}

interface ConfirmationButtonProps extends ButtonStyle {
  onConfirm(): void;
  label: string;
  confirmLabel: string;
}

export function ConfirmationButton({
  onConfirm,
  label,
  confirmLabel,
  ...buttonStyle
}: ConfirmationButtonProps) {
  const [confirmationNeeded, setConfirmationNeeded] = useState(false);
  return (
    <Button
      onClick={() => {
        if (confirmationNeeded) {
          onConfirm();
          setConfirmationNeeded(false);
        } else {
          setConfirmationNeeded(true);
        }
      }}
      {...buttonStyle}
    >
      {confirmationNeeded ? (
        <span>
          <DangerIcon />
          {confirmLabel}
        </span>
      ) : (
        <span>{label}</span>
      )}
    </Button>
  );
}
