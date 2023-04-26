export interface Entry<T> {
  id: string;
  value: T;
}

export type EntryRecord<T> = Record<string, Entry<T>>;

export interface Repository<T> {
  saveNew(newVal: T): string;
  update(id: string, setter: (c: T) => T): void;
  deleteEntry(entry: Entry<T>): void;
  getEntries(): Entry<T>[];
  getEntry(id: string): T;
  reload(): void;
}

export type StringProperties<T> = keyof {
  [Property in keyof T as T[Property] extends string
    ? Property
    : never]: T[Property];
};