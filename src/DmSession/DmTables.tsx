import { CustomEntry, Game } from "Rules/types";
import { ReadWriteGame } from "./types";
import { Table } from "UI/Organisms/Table";
import { Column } from "UI/Organisms/Table";
import { updateInList } from "helpers";
import {
  AllowedIcon,
  ButtonIcon,
  DiceIcon,
  EyeIcon,
  EyeSlashIcon,
  ForbiddenIcon,
} from "UI/Icons";
import { Button } from "UI/Atoms";
import { useCallback, useMemo, useState } from "react";
import { simpleRoll } from "Services/diceServices";
import { toDict } from "Services/storageServices";

interface Props extends ReadWriteGame {
  updateRevealedElements(c: Game): void;
}

type EntryType = "monsters" | "npcs" | "customEntries";

interface Table {
  title: string;
  type: EntryType;
  entries: CustomEntry[];
}

function getColumns(
  category: string,
  idSelected: string | null,
  updateRow: (elt: CustomEntry) => void
): Column<CustomEntry>[] {
  return [
    {
      name: category,
      cell({ elt }) {
        const color = elt.id === idSelected ? "text-mother-5" : "text-mother-1";
        return (
          <>
            <span>{elt.name}</span>
            <span className={`transition-colors ${color}`}>
              {" "}
              - <DiceIcon />
            </span>
          </>
        );
      },
    },
    {
      name: "vis.",
      className: "w-16",
      cell({ elt }) {
        return (
          <div className="text-center">
            <ButtonIcon
              onClick={() =>
                updateRow({ ...elt, visibleToAll: !elt.visibleToAll })
              }
            >
              {elt.visibleToAll ? <EyeIcon /> : <EyeSlashIcon />}
            </ButtonIcon>
          </div>
        );
      },
    },
    {
      name: "excl.",
      className: "w-16",
      cell({ elt }) {
        return (
          <div className="text-center">
            <ButtonIcon
              onClick={() => updateRow({ ...elt, excluded: !elt.excluded })}
            >
              {elt.excluded ? <ForbiddenIcon /> : <AllowedIcon />}
            </ButtonIcon>
          </div>
        );
      },
    },
  ];
}

function getTables(game: Game) {
  const tables: Table[] = [];
  if (game.monsters.length > 0) {
    tables.push({
      title: "monsters",
      type: "monsters",
      entries: game.monsters,
    });
  }
  if (game.npcs.length > 0) {
    tables.push({ title: "npcs", type: "npcs", entries: game.npcs });
  }
  const others = game.customEntries.filter((c) => !!c.category);
  if (others.length > 0) {
    const byCat: Record<string, CustomEntry[]> = {};
    others.forEach((customEntry) => {
      const category = customEntry.category!;
      if (byCat[category] === undefined) {
        byCat[category] = [];
      }
      byCat[category].push(customEntry);
    });
    Object.entries(byCat).forEach(([category, items]) =>
      tables.push({ title: category, type: "customEntries", entries: items })
    );
  }
  return tables;
}

export function DmTables({ game, setGame, updateRevealedElements }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const tables = useMemo(() => getTables(game), [game]);

  const updateElt = (elt: CustomEntry, type: EntryType) => {
    setGame((oldGame) => {
      const newGame = {
        ...oldGame,
        [type]: updateInList(oldGame[type], elt.id, () => elt),
      };
      updateRevealedElements(newGame);
      return newGame;
    });
  };

  const allCollumns = toDict(
    tables.map((t) => ({
      columns: getColumns(t.title, selected, (elt) => updateElt(elt, t.type)),
      title: t.title,
    })),
    (c) => c.title
  );

  return (
    <div className="flex flex-col gap-4">
      {tables.map((t) => (
        <div key={t.title} className="flex flex-col gap-2 items-start">
          <Button
            dark
            rounded
            onClick={() => {
              const entries = t.entries.filter((e) => !e.excluded);
              const roll = simpleRoll(entries.length);
              const result = entries[roll].id;
              setSelected(result);
            }}
          >
            roll {t.title}
          </Button>
          <Table columns={allCollumns[t.title].columns} rows={t.entries} />
        </div>
      ))}
    </div>
  );
}
