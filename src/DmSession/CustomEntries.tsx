import { Title, Button } from "UI/Atoms";
import { updateInList, deleteInList } from "helpers";
import { useState } from "react";
import { ReadWriteGame } from "./types";
import { CustomEntry } from "Rules/types";
import { uuidv4 } from "Services/storageServices";
import { CustomEntryDisplay } from "UI/Organisms/CustomEntryDisplay";

export function CustomEntries({ game, setGame }: ReadWriteGame) {
  const [newCustomEntryName, setNewCustomEntryName] = useState("");
  const { customEntries } = game;

  function newCustomEntry(name: string): CustomEntry {
    return {
      name,
      description: "",
      visibleToAll: false,
      id: uuidv4(),
    };
  }
 
  return (
    <>
      <Title>Custom entries</Title>
      <div className="flex flex-wrap justify-center items-center gap-2 mb-8">
        {customEntries.map((c) => (
          <CustomEntryDisplay
            key={c.id}
            customEntry={c}
            setCustomEntry={(setter) => {
              setGame((g) => ({
                ...g,
                customEntries: updateInList(g.customEntries, c.id, setter),
              }));
            }}
            deleteCustomEntry={() => {
              setGame((g) => ({
                ...g,
                customEntries: deleteInList(g.customEntries, c.id),
              }));
            }}
          />
        ))}
      </div>
      <div className="flex items-center gap-2">
        <div className="shrink-0">
          <Button
            onClick={() => {
              setGame((g) => ({
                ...g,
                customEntries: [...g.customEntries, newCustomEntry(newCustomEntryName)],
              }));
              setNewCustomEntryName("");
            }}
          >
            New Custom Entry
          </Button>
        </div>
        <input
          className="input border-2 border-mother-5"
          placeholder="name"
          value={newCustomEntryName}
          onChange={(e) => setNewCustomEntryName(e.target.value)}
        />
      </div>
    </>
  );
}
