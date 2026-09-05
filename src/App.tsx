import { useEffect, useState } from 'react';
import { Board } from './components/Board'
import { createEmptyBoard } from './game/board'
import { spawnTile } from './game/spawn';
import { moveLeft, moveRight, boardsEqual } from './game/moves';
import './App.css'

function App() {
  const [board, setBoard] = useState(() => {
    const emptyBoard = createEmptyBoard();
    const firstSpawn = spawnTile(emptyBoard);
    return spawnTile(firstSpawn)
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        const movedBoard = moveLeft(board)
        if (!boardsEqual(board, movedBoard)) {
          setBoard(spawnTile(movedBoard))
        }
      } else if (event.key === "ArrowRight") {
        const movedBoard = moveRight(board)
        if (!boardsEqual(board, movedBoard)) {
          setBoard(spawnTile(movedBoard))
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [board]);

  return (
    <main>
      <h1>2048</h1>
      <Board board={board} />
    </main>
  )
}

export default App
