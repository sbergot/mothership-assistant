import { CustomEntry, Game } from "Rules/types";
import { ReadWriteGame } from "./types";
import { Table } from "UI/Organisms/Table";
import { Column } from "UI/Organisms/Table";

interface Props extends ReadWriteGame {}

interface Table {
  title: string;
  entries: CustomEntry[];
}

function getColumns(category: string): Column<CustomEntry>[] {
  return [
    {
      name: category,
      cell({ elt }) {
        return <span>{elt.name}</span>;
      },
    },
  ];
}

function getTables(game: Game) {
  const tables: Table[] = [];
  if (game.monsters.length > 0) {
    tables.push({ title: "monsters", entries: game.monsters });
  }
  if (game.npcs.length > 0) {
    tables.push({ title: "npcs", entries: game.npcs });
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
      tables.push({ title: category, entries: items })
    );
  }
  return tables;
}

export function DmTables({ game, setGame }: Props) {
  const tables = getTables(game);
  return (
    <div className="flex flex-col gap-4">
      {tables.map((t) => (
        <div>
          <Table columns={getColumns(t.title)} rows={t.entries} />
        </div>
      ))}
    </div>
  );
}
