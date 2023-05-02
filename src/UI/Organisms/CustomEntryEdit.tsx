import { CustomEntry } from "Rules/types";
import { BlockWithTitle, EntryHeader } from "UI/Molecules";

interface Props {
  customEntry: CustomEntry;
  setCustomEntry(setter: (m: CustomEntry) => CustomEntry): void;
  deleteCustomEntry(): void;
}

export function CustomEntryEdit({
  customEntry,
  setCustomEntry,
  deleteCustomEntry,
}: Props) {
  const header = (
    <EntryHeader
      title={customEntry.name}
      visible={customEntry.visibleToAll}
      onToggleVisibility={() => {
        setCustomEntry((m) => ({ ...m, visibleToAll: !m.visibleToAll }));
      }}
      onDelete={deleteCustomEntry}
    />
  );
  return (
    <BlockWithTitle light title={header}>
      <input
        className="input"
        placeholder="category"
        value={customEntry.category ?? ""}
        onChange={(e) =>
          setCustomEntry((m) => ({ ...m, category: e.target.value }))
        }
      />
      <div className="py-2">
        <textarea
          placeholder="description"
          value={customEntry.description}
          className="input resize-none h-32"
          onChange={(e) =>
            setCustomEntry((m) => ({ ...m, description: e.target.value }))
          }
        />
      </div>
    </BlockWithTitle>
  );
}
