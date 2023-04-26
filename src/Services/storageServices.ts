import { Entry, EntryRecord, Repository } from "BaseTypes";
import useLocalStorage from "use-local-storage";

export function uuidv4(): string {
  return (([1e7] as any) + -1e3 + -4e3 + -8e3 + -1e11).replace(
    /[018]/g,
    (c: any) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
  );
}

export function createRepository<T>(key: string) {
  function useRepository(): Repository<T> {
    const [stateRepo, setStateRepo] = useLocalStorage<EntryRecord<T>>(key, {});

    function saveNew(newVal: T) {
      const newId = uuidv4();
      setStateRepo((repo) => ({
        ...repo,
        [newId]: { id: newId, value: newVal },
      }));
      return newId;
    }

    function update(id: string, setter: (c: T) => T) {
      setStateRepo((repo) => {
        repo = repo || {};
        const newValue = setter(repo[id].value);
        return { ...repo, [id]: { id, value: newValue } } as EntryRecord<T>;
      });
    }

    function deleteEntry(entry: Entry<T>) {
      setStateRepo((repo) => {
        const newRepo = { ...repo };
        delete newRepo[entry.id];
        return newRepo;
      });
    }

    function getEntries() {
      return Object.values(stateRepo);
    }

    function getEntry(id: string) {
      return stateRepo[id].value;
    }

    function reload() {
      setStateRepo(JSON.parse(localStorage.getItem(key) || "{}"))
    }

    return { saveNew, update, deleteEntry, getEntries, getEntry, reload };
  }
  return useRepository;
}

export function toDict<T, K extends string>(
  arr: T[],
  keySelector: (elt: T) => K
): Record<K, T> {
  const res = {} as Record<K, T>;
  arr.forEach((elt) => {
    res[keySelector(elt)] = elt;
  });
  return res;
}
