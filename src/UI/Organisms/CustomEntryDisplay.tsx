import { CustomEntry } from "Rules/types";
import { ButtonIcon, EyeIcon, EyeSlashIcon, TrashIcon } from "UI/Icons";

interface Props {
  customEntry: CustomEntry;
  setCustomEntry(setter: (m: CustomEntry) => CustomEntry): void;
  deleteCustomEntry(): void;
}

export function CustomEntryDisplay({
  customEntry,
  setCustomEntry,
  deleteCustomEntry,
}: Props) {
  return (
    <div className="rounded-xl bg-mother-2 flex flex-col gap-4">
      <div className="rounded-3xl bg-mother-6 text-mother-1 text-center flex justify-center">
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
      <div className="p-4">
        <div>
          <textarea
            value={customEntry.description}
            className="input resize-none h-32"
            onChange={(e) =>
              setCustomEntry((m) => ({ ...m, description: e.target.value }))
            }
          />
        </div>
      </div>
    </div>
  );
}
