import { Board } from './components/Board'
import { createEmptyBoard } from './game/board'
import { spawnTile } from './game/spawn';
import './App.css'

function App() {
  const board = createEmptyBoard();
  const firstSpawn = spawnTile(board);
  const secondSpawn = spawnTile(firstSpawn);

  return (
    <main>
      <h1>2048</h1>
      <Board board={secondSpawn} />
    </main>
  )
}

export default App
