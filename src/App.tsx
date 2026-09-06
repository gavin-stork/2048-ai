import { useEffect, useState } from 'react';
import { Board } from './components/Board'
import { createEmptyBoard } from './game/board'
import { spawnTile } from './game/spawn';
import { moveLeft, moveRight, boardsEqual, moveUp, moveDown } from './game/moves';
import './App.css'

function App() {
  const [board, setBoard] = useState(() => {
    const emptyBoard = createEmptyBoard()
    const firstSpawn = spawnTile(emptyBoard)
    return spawnTile(firstSpawn)
  });

  const [score, setScore] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        const movedBoard = moveLeft(board)
        if (!boardsEqual(board, movedBoard.board)) {
          setBoard(spawnTile(movedBoard.board))
          setScore(score => score + movedBoard.score)
        }
      } else if (event.key === "ArrowRight") {
        const movedBoard = moveRight(board)
        if (!boardsEqual(board, movedBoard.board)) {
          setBoard(spawnTile(movedBoard.board))
          setScore(score => score + movedBoard.score)
        }
      } else if (event.key === "ArrowUp") {
        const movedBoard = moveUp(board)
        if (!boardsEqual(board, movedBoard.board)) {
          setBoard(spawnTile(movedBoard.board))
          setScore(score => score + movedBoard.score)
          
        }
      } else if (event.key === "ArrowDown") {
        const movedBoard = moveDown(board)
        if (!boardsEqual(board, movedBoard.board)) {
          setBoard(spawnTile(movedBoard.board))
          setScore(score => score + movedBoard.score)
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
      <p>Score: {score}</p>
      <Board board={board} />
    </main>
  )
}

export default App
