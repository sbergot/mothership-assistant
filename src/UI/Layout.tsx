import { Children } from "./types";

export function Layout({ children }: Children) {
  return (
    <div className="p-4 max-w-6xl bg-mother-1 flex flex-col">
      <div className="self-center">
        <h1 className="text-4xl">
          <a href="/">{import.meta.env.VITE_TITLE}</a>
        </h1>
        <h2>Mothership is a tabletop rpg by Tuesday Knight Games</h2>
        <a className="link" href="https://www.tuesdayknightgames.com">
          www.tuesdayknightgames.com
        </a>{" "}
        -{" "}
        <a
          className="link"
          href="https://github.com/sbergot/mothership-assistant/issues"
        >
          report a bug
        </a>{" "}
        -{" "}
        <a
          className="link"
          href="https://discordapp.com/channels/461670627468771329/1097053365004939314"
        >
          discord
        </a>{" "}
      </div>
      <div className="mt-4 text-lg uppercase font-bold text-mother-6">
        {children}
      </div>
    </div>
  );
}
