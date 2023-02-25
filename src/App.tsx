import { CharacterSheet } from "./CharacterSheet"
import { data } from "./Data/data"

function App() {
  return (
    <CharacterSheet character={data} />
  )
}

export default App
