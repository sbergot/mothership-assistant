import { useState } from "react";
import { initCharacter } from "../Services/characterServices";
import { RollStats } from "./RollStats";

export function CharacterCreation() {
  const [character, setCharacter] = useState(initCharacter())
  return <RollStats character={character} setCharacter={setCharacter} />;
}
