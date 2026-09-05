import type { Board } from "../game/types";

interface BoardProps {
  board: Board;
}

export function Board(props: BoardProps) {
  return (
    <div className="board">
      {props.board.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((cell, colIndex) => (
            <div className="cell" key={colIndex}>
              {cell === 0 ? '' : cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}