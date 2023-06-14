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

export function ChatIcon() {
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
        d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
      />
    </svg>
  );
}

export function XIcon() {
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
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

export function DangerIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#FF5151"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="inline-block w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
      />
    </svg>
  );
}

export function EyeIcon() {
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
        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

export function EyeSlashIcon() {
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
        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
      />
    </svg>
  );
}

export function NewsIcon() {
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
        d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
      />
    </svg>
  );
}

export function GroupIcon() {
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
        d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
      />
    </svg>
  );
}

export function DiceIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 1024 1024"
      strokeWidth={25}
      stroke="currentColor"
      className="inline-block w-6 h-6"
    >
      <path d="M341.333333 385.706667c-11.946667 0-22.186667-4.266667-30.72-12.8-7.970133-7.970133-11.946667-17.92-11.946666-29.866667s3.976533-22.186667 11.946666-30.72c8.533333-7.953067 18.773333-11.946667 30.72-11.946667s21.896533 3.976533 29.866667 11.946667c8.533333 8.533333 12.8 18.773333 12.8 30.72s-4.266667 21.896533-12.8 29.866667c-7.970133 8.533333-17.92 12.8-29.866667 12.8z m128-213.333334c11.946667 0 21.896533 3.976533 29.866667 11.946667 8.533333 8.533333 12.8 18.773333 12.8 30.72s-4.266667 21.896533-12.8 29.866667c-7.970133 8.533333-17.92 12.8-29.866667 12.8s-22.186667-4.266667-30.72-12.8c-7.970133-7.970133-11.946667-17.92-11.946666-29.866667s3.976533-22.186667 11.946666-30.72c8.533333-7.970133 18.773333-11.946667 30.72-11.946667zM243.2 500.906667c-7.970133 8.533333-17.92 12.8-29.866667 12.8s-22.186667-4.266667-30.72-12.8c-7.970133-7.970133-11.946667-17.92-11.946666-29.866667s3.976533-22.186667 11.946666-30.72c8.533333-7.953067 18.773333-11.946667 30.72-11.946667s21.896533 3.976533 29.866667 11.946667c8.533333 8.533333 12.8 18.773333 12.8 30.72s-4.266667 21.896533-12.8 29.866667z" />
      <path d="M512 954.026667c-27.0336-0.682667-50.176-10.683733-69.239467-29.730134-19.3024-19.3536-30.429867-42.666667-33.0752-69.2736L409.6 616.106667H170.666667c-27.0336-0.682667-50.176-10.683733-69.239467-29.730134-19.285333-19.319467-30.4128-42.615467-33.0752-69.256533L68.266667 169.813333c2.082133-27.562667 12.629333-50.414933 31.4368-69.239466 19.626667-19.626667 43.3664-29.917867 70.536533-30.583467h344.302933c27.016533 0.682667 50.158933 10.666667 69.239467 29.730133 19.643733 19.626667 29.934933 43.349333 30.6176 70.519467V407.893333h241.493333c27.050667 0.7168 50.176 10.7008 69.239467 29.7472 19.6096 19.626667 29.917867 43.3664 30.600533 70.519467V854.186667c-2.065067 27.5456-12.612267 50.397867-31.453866 69.256533-19.643733 19.626667-43.3664 29.917867-70.536534 30.600533H512z m-68.266667-354.986667V853.333333c1.792 17.152 9.403733 33.041067 23.176534 46.848 12.817067 12.817067 27.716267 19.268267 45.5168 19.712H853.333333c17.937067-0.443733 33.399467-7.202133 46.813867-20.599466 13.073067-13.090133 20.1216-28.279467 21.504-46.421334L921.6 508.586667c-0.443733-17.954133-7.202133-33.399467-20.599467-46.813867-12.834133-12.817067-27.733333-19.285333-45.550933-19.7632L512 442.026667c-17.937067 0.4608-33.399467 7.202133-46.830933 20.616533-13.056 13.073067-20.087467 28.245333-21.486934 46.404267L443.733333 599.04zM123.8528 124.706133c-13.073067 13.073067-20.104533 28.2624-21.504 46.421334L102.4 515.413333c1.792 17.169067 9.403733 33.058133 23.159467 46.813867 12.817067 12.834133 27.733333 19.285333 45.533866 19.729067H409.6v-74.24c2.082133-27.562667 12.629333-50.414933 31.4368-69.239467 19.643733-19.6096 43.3664-29.9008 70.519467-30.583467h68.693333V170.666667c-0.443733-17.954133-7.202133-33.399467-20.599467-46.813867-12.834133-12.8512-27.733333-19.3024-45.5168-19.746133H170.666667c-17.954133 0.443733-33.399467 7.185067-46.813867 20.599466z" />
      <path d="M840.533333 522.24c8.533333 8.533333 12.8 18.773333 12.8 30.72 0 11.9296-4.266667 21.896533-12.8 29.866667-7.970133 8.533333-17.92 12.8-29.866666 12.8s-22.186667-4.266667-30.72-12.8c-7.9872-7.953067-11.946667-17.92-11.946667-29.866667s3.959467-22.203733 11.946667-30.737067c8.533333-7.970133 18.773333-11.963733 30.72-11.963733s21.896533 4.027733 29.866666 11.9808z m0 128c8.533333 8.533333 12.8 18.773333 12.8 30.72 0 11.9296-4.266667 21.896533-12.8 29.866667-7.970133 8.533333-17.92 12.8-29.866666 12.8s-22.186667-4.266667-30.72-12.8c-7.9872-7.953067-11.946667-17.92-11.946667-29.866667s3.959467-22.203733 11.946667-30.737067c8.533333-7.970133 18.773333-11.9296 30.72-11.9296s21.896533 3.9936 29.866666 11.946667z m-60.586666 128c8.533333-7.953067 18.773333-11.9296 30.72-11.9296s21.896533 3.976533 29.866666 11.9296c8.533333 8.533333 12.8 18.773333 12.8 30.72 0 11.9296-4.266667 21.896533-12.8 29.866667-7.970133 8.533333-17.92 12.8-29.866666 12.8s-22.186667-4.266667-30.72-12.8c-7.9872-7.953067-11.946667-17.92-11.946667-29.866667s3.959467-22.186667 11.946667-30.72zM597.333333 552.96c0 11.9296-4.266667 21.896533-12.8 29.866667-7.970133 8.533333-17.92 12.8-29.866666 12.8s-22.186667-4.266667-30.72-12.8c-7.970133-7.953067-11.946667-17.92-11.946667-29.866667s3.976533-22.203733 11.946667-30.737067c8.533333-7.970133 18.773333-11.963733 30.72-11.963733s21.896533 3.9936 29.866666 11.963733c8.533333 8.5504 12.8 18.7904 12.8 30.737067z m-73.386666 225.28c8.533333-7.953067 18.773333-11.9296 30.72-11.9296s21.896533 3.976533 29.866666 11.9296c8.533333 8.533333 12.8 18.773333 12.8 30.72 0 11.9296-4.266667 21.896533-12.8 29.866667-7.970133 8.533333-17.92 12.8-29.866666 12.8s-22.186667-4.266667-30.72-12.8c-7.970133-7.953067-11.946667-17.92-11.946667-29.866667s3.976533-22.186667 11.946667-30.72z m-11.946667-97.28c0-11.946667 3.976533-22.203733 11.946667-30.737067 8.533333-7.970133 18.773333-11.9296 30.72-11.9296s21.896533 3.959467 29.866666 11.9296c8.533333 8.5504 12.8 18.7904 12.8 30.737067 0 11.9296-4.266667 21.896533-12.8 29.866667-7.970133 8.533333-17.92 12.8-29.866666 12.8s-22.186667-4.266667-30.72-12.8c-7.970133-7.953067-11.946667-17.92-11.946667-29.866667z" />{" "}
    </svg>
  );
}

export function ChevronRightIcon() {
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
        d="M8.25 4.5l7.5 7.5-7.5 7.5"
      />
    </svg>
  );
}

export function ChevronDownIcon() {
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
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

export function ForbiddenIcon() {
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
        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
      />
    </svg>
  );
}

export function AllowedIcon() {
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
        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

export function TableIcon() {
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
        d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"
      />
    </svg>
  );
}

export function ClockIcon() {
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
        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

export function PlayIcon() {
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
        d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
      />
    </svg>
  );
}

export function PauseIcon() {
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
        d="M15.75 5.25v13.5m-7.5-13.5v13.5"
      />
    </svg>
  );
}

export function ResetIcon() {
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
        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
      />
    </svg>
  );
}

export function EditIcon() {
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
        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
      />
    </svg>
  );
}

export function FireIcon() {
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
        d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
      />
    </svg>
  );
}
