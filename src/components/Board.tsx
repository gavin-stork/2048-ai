import { useEffect, useState } from "react"
import type { Board, AnimationState } from "../game/types"

interface BoardProps {
  board: Board
  animation: AnimationState
}

export function Board({ board, animation }: BoardProps) {
  const [animationStarted, setAnimationStarted] = useState(false)

  const displayBoard = animation ? animation.startBoard : board

  useEffect(() => {
    if (!animation) {
      setAnimationStarted(false)
      return
    }

    const frame = requestAnimationFrame(() => {
      setAnimationStarted(true)
    })

    return () => {
      cancelAnimationFrame(frame)
    }
  }, [animation])

  return (
    <div className="board">
      <div className="grid">
        {board.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((_, colIndex) => (
              <div
                className="cell cell-0"
                key={colIndex}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="tiles">
        {displayBoard.map((row, rowIndex) =>
          row.map((value, colIndex) => {
            if (value === 0) {
              return null
            }

            const movement = animation?.movements.find(
              move =>
                move.from[0] === rowIndex &&
                move.from[1] === colIndex
            )

            let translateX = 0
            let translateY = 0

            if (movement && animationStarted) {
              translateX =
                (movement.to[1] - movement.from[1]) * 90

              translateY =
                (movement.to[0] - movement.from[0]) * 90
            }

            return (
              <div
                className={`tile cell-${value}`}
                key={`${rowIndex}-${colIndex}`}
                style={{
                  top: `${rowIndex * 90}px`,
                  left: `${colIndex * 90}px`,
                  transform: `translate(${translateX}px, ${translateY}px)`,
                  transition: animation
                    ? "transform 50ms ease"
                    : "none"
                }}
              >
                {value}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}