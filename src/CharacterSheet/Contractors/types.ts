import { Contractor } from "Rules/types";

export interface ReadContractor {
  contractor: Contractor;
}

export interface WriteContractor {
  setContractor(setter: (c: Contractor) => Contractor): void;
}

export type ReadWriteContractor = ReadContractor & WriteContractor;
