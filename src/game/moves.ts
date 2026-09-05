import type { Board } from "./types";

function moveRowLeft(row: number[]): number[] {
  const filteredRow = row.filter(num => num !== 0);

  for (let i = 0; i < filteredRow.length - 1; i++) {
    if (filteredRow[i] === filteredRow[i + 1]) {
      filteredRow[i] *= 2;
      filteredRow[i + 1] = 0;
    }
  }

  const movedRow = filteredRow.filter(num => num !== 0);

  while (movedRow.length < 4) {
    movedRow.push(0)
  }

  return movedRow;
}

export function moveLeft(board: Board): Board {
  const movedBoard = board.map(row => moveRowLeft(row))
  return movedBoard
}

export function moveRight(board: Board): Board {
  const reversedBoard = board.map(row => [...row].reverse())
  const movedBoard = reversedBoard.map(row => moveRowLeft(row))
  return movedBoard.map(row => [...row].reverse())
}

export function boardsEqual(board1: Board, board2: Board): boolean {
  for (let r = 0; r < board1.length; r++) {
    for (let c = 0; c < board1[0].length; c++) {
      if (board1[r][c] !== board2[r][c]) {
        return false
      }
    }
  }
  return true
}