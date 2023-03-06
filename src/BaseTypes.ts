export interface Entry<T> {
  id: string;
  value: T;
}

export type EntryRecord<T> = Record<string, Entry<T>>;

export interface Repository<T> {
  saveNew(newVal: T): void;
  update(entry: Entry<T>): void;
  deleteEntry(entry: Entry<T>): void;
  getEntries(): Entry<T>[];
  getEntry(id: string): T;
}