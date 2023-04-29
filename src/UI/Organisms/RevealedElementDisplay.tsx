import { RevealedElement } from "Rules/types";

export function RevealedElementDisplay({ elt }: { elt: RevealedElement }) {
  return (
    <div className="rounded-xl bg-mother-2 flex flex-col max-w-sm">
      <div className="rounded-3xl bg-mother-6 text-mother-1 text-center flex justify-center">
        <div className="flex-grow">{elt.name}</div>
      </div>
      <div className="py-2 px-4">
        <div>{elt.description}</div>
      </div>
    </div>
  );
}
