import { useState } from 'react';
import { Board } from './components/Board'
import { createEmptyBoard } from './game/board'
import { spawnTile } from './game/spawn';
import './App.css'

function App() {
  const [board, setBoard] = useState(() => {
    const emptyBoard = createEmptyBoard();
    const firstSpawn = spawnTile(emptyBoard);
    return spawnTile(firstSpawn)
  });

  return (
    <main>
      <h1>2048</h1>
      <Board board={board} />
    </main>
  )
}

export default App
