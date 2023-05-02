import { CustomEntry } from "Rules/types";
import { ButtonIcon, EyeIcon, EyeSlashIcon, TrashIcon } from "UI/Icons";
import { BlockWithTitle } from "UI/Molecules";

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
    <div className="flex">
      <div className="flex-grow">{customEntry.name}</div>
      <div className="mr-2">
        <ButtonIcon
          light
          onClick={() => {
            setCustomEntry((m) => ({ ...m, visibleToAll: !m.visibleToAll }));
          }}
        >
          {customEntry.visibleToAll ? <EyeIcon /> : <EyeSlashIcon />}
        </ButtonIcon>
        <ButtonIcon light onClick={deleteCustomEntry}>
          <TrashIcon />
        </ButtonIcon>
      </div>
    </div>
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
