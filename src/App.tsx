import { Board } from './components/Board'
import { createEmptyBoard } from './game/board'
import './App.css'

function App() {
  const board = createEmptyBoard();

  return (
    <main>
      <h1>2048</h1>
      <Board board={board} />
    </main>
  )
}

export default App
