import { useState } from "react";
import { CharacterCreation } from "./CharacterCreation/CharacterCreation"
import { CharacterSheet } from "./CharacterSheet"
import { initCharacter } from "./Services/characterServices";
import { Character } from "./Rules/types";

function App() {
  const [character, setCharacter] = useState<Character | null>(null);

  if (character !== null) {
    return <CharacterSheet character={character} />
  }
  return (
    <CharacterCreation onComplete={(c) => setCharacter(c)} />
  )
}

export default App
