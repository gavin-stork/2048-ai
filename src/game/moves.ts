import type { Board, MoveRowResult, MoveBoardResult } from "./types"

function moveRowLeft(row: number[]): MoveRowResult {
  let score = 0
  const filteredRow = row.filter(num => num !== 0)

  for (let i = 0; i < filteredRow.length - 1; i++) {
    if (filteredRow[i] === filteredRow[i + 1]) {
      filteredRow[i] *= 2
      filteredRow[i + 1] = 0
      score += filteredRow[i]
    }
  }

  const movedRow = filteredRow.filter(num => num !== 0);

  while (movedRow.length < 4) {
    movedRow.push(0)
  }

  return { row: movedRow, score: score}
}

function transpose(board: Board): Board {
  const transposed = board.map((_, colIndex) => board.map(row => row[colIndex]))
  return transposed
}

function reverse(board: Board): Board {
  const reversed = board.map(row => [...row].reverse())
  return reversed
}

export function moveLeft(board: Board): MoveBoardResult {
  const results = board.map(row => moveRowLeft(row))
  const movedBoard = results.map(result => result.row)

  let score = 0
  for (const result of results) {
    score += result.score
  }
  return { board: movedBoard, score: score}
}

export function moveRight(board: Board): MoveBoardResult {
  const reversedBoard = reverse(board)
  const results = reversedBoard.map(row => moveRowLeft(row))
  const movedBoard = results.map(result => result.row)

  let score = 0
  for (const result of results) {
    score += result.score
  }

  return { board: reverse(movedBoard), score: score }
}

export function moveUp(board: Board): MoveBoardResult {
  const transposedBoard = transpose(board)
  const results = transposedBoard.map(row => moveRowLeft(row))
  const movedBoard = results.map(result => result.row)

  let score = 0
  for (const result of results) {
    score += result.score
  }

  return { board: transpose(movedBoard), score: score }
}

export function moveDown(board: Board): MoveBoardResult {
  const transposedBoard = transpose(board)
  const reversedBoard = reverse(transposedBoard)
  const results = reversedBoard.map(row => moveRowLeft(row))
  const movedBoard = results.map(result => result.row)

  let score = 0
  for (const result of results) {
    score += result.score
  }

  return { board: transpose(reverse(movedBoard)), score: score }
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