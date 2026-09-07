import { useEffect, useState } from 'react'
import { Board } from './components/Board'
import { createEmptyBoard } from './game/board'
import { spawnTile } from './game/spawn'
import { moveLeft, moveRight, boardsEqual, moveUp, moveDown, isGameOver } from './game/moves'
import './App.css'
import type { AnimationState } from './game/types'

function App() {
  const [board, setBoard] = useState(() => {
    const emptyBoard = createEmptyBoard()
    const firstSpawn = spawnTile(emptyBoard)
    return spawnTile(firstSpawn)
  });

  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [animation, setAnimation] = useState<AnimationState>(null)

  useEffect(() => {
    if (isGameOver(board)) {
      setAnimation(null)
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (animation) {
        return
      }
      if (event.key === "ArrowLeft") {
        const movedBoard = moveLeft(board)
        if (!boardsEqual(board, movedBoard.board)) {
          finishMove(movedBoard)
        }
      } else if (event.key === "ArrowRight") {
        const movedBoard = moveRight(board)
        if (!boardsEqual(board, movedBoard.board)) {
          finishMove(movedBoard)
        }
      } else if (event.key === "ArrowUp") {
        const movedBoard = moveUp(board)
        if (!boardsEqual(board, movedBoard.board)) {
          finishMove(movedBoard)
        }
      } else if (event.key === "ArrowDown") {
        const movedBoard = moveDown(board)
        if (!boardsEqual(board, movedBoard.board)) {
          finishMove(movedBoard)
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)


    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [board, animation])

  function newGame() {
    const emptyBoard = createEmptyBoard()
    const firstSpawn = spawnTile(emptyBoard)
    const secondSpawn = spawnTile(firstSpawn)

    setBoard(secondSpawn)
    setScore(0)
    setMoves(0)
  }

  function finishMove(movedBoard: ReturnType<typeof moveLeft>) {
    setAnimation({
      startBoard: board,
      movements: movedBoard.movements
    })

    setTimeout(() => {
      setBoard(spawnTile(movedBoard.board))
      setScore(score => score + movedBoard.score)
      setMoves(moves => moves + 1)
      setAnimation(null)
    }, 59)
  }

  const gameOver = isGameOver(board);

  return (
    <main>
      {!gameOver && ( 
        <div className='game-score-container'>
          <p className='game-score-text'>Score</p>
          <p className='game-score'>{score}</p>
        </div>
      )}
      {gameOver && (
        <div className='postgame-container'>
          <div className='game-over-container'>
            <p className='game-over-text'>Game Over</p>
            <p className='game-over-desc'>{score} points scored in {moves} moves.</p>
          </div>
          <div className='new-game-button-container'>
            <button className='new-game-button' onClick={newGame}>New Game</button>
          </div>
        </div>
      )}
      <Board board={board} animation={animation} />
    </main>
  )
}

export default App
