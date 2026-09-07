import type { Board, MoveRowResult, MoveBoardResult, TileMovement } from "./types"

function moveRowLeft(row: number[]): MoveRowResult {
  let score = 0

  const tiles = row.map ((value,col) => ({
    value: value,
    originalCol: col,
    mergedIntoPrevious: false
  }))

  const filteredTiles = tiles.filter(tile => tile.value !== 0)

  for (let i = 0; i < filteredTiles.length - 1; i++) {
    if (filteredTiles[i].value === filteredTiles[i + 1].value) {
      filteredTiles[i].value *= 2
      filteredTiles[i + 1].value = 0
      filteredTiles[i + 1].mergedIntoPrevious = true
      score += filteredTiles[i].value
    }
  }

  const movedTiles = filteredTiles.filter(tile => tile.value !== 0)
  const movedRow = movedTiles.map(tile => tile.value)

  while (movedRow.length < 4) {
    movedRow.push(0)
  }

  const movements = []
  let destinationCol = 0

  for (const tile of filteredTiles) {
    if (tile.mergedIntoPrevious) {
      movements.push({
        fromCol: tile.originalCol,
        toCol: destinationCol - 1
      })
    } else {
      movements.push({
        fromCol: tile.originalCol,
        toCol: destinationCol
      })
      destinationCol++
    }
  }

  return { row: movedRow, score, movements}
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
  const results = board.map((row, rowIndex) => ({
    results: moveRowLeft(row),
    rowIndex
  }))

  const movedBoard = results.map(result => result.results.row)

  let score = 0
  const movements: TileMovement[] = []

  for (const result of results) {
    score += result.results.score
    for (const movement of result.results.movements) {
      movements.push({
        from: [result.rowIndex, movement.fromCol],
        to: [result.rowIndex, movement.toCol]
      })
    }
  }

  return { board: movedBoard, score, movements}
}

export function moveRight(board: Board): MoveBoardResult {
  const reversedBoard = reverse(board)
  const results = reversedBoard.map((row, rowIndex) => ({
    results: moveRowLeft(row),
    rowIndex
  }))

  const movedBoard = results.map(result => result.results.row)

  let score = 0
  const movements: TileMovement[] = []

  for (const result of results) {
    score += result.results.score
    for (const movement of result.results.movements) {
      movements.push({
        from: [result.rowIndex, 3 - movement.fromCol],
        to: [result.rowIndex, 3 - movement.toCol]
      })
    }
  }

  return { board: reverse(movedBoard), score, movements}
}

export function moveUp(board: Board): MoveBoardResult {
  const transposedBoard = transpose(board)
  const results = transposedBoard.map((row, rowIndex) => ({
    results: moveRowLeft(row),
    rowIndex
  }))
  const movedBoard = results.map(result => result.results.row)

  let score = 0
  const movements: TileMovement[] = []

  for (const result of results) {
    score += result.results.score
    for (const movement of result.results.movements) {
      movements.push({
        from: [movement.fromCol, result.rowIndex ],
        to: [movement.toCol, result.rowIndex]
      })
    }
  }

  return { board: transpose(movedBoard), score, movements }
}

export function moveDown(board: Board): MoveBoardResult {
  const transposedBoard = transpose(board)
  const reversedBoard = reverse(transposedBoard)
  const results = reversedBoard.map((row, rowIndex) => ({
    results: moveRowLeft(row),
    rowIndex
  }))
  const movedBoard = results.map(result => result.results.row)

  let score = 0
  const movements: TileMovement[] = []

  for (const result of results) {
    score += result.results.score
    for (const movement of result.results.movements) {
      movements.push({
        from: [3 - movement.fromCol, result.rowIndex ],
        to: [3 - movement.toCol, result.rowIndex]
      })
    }
  }

  return { board: transpose(reverse(movedBoard)), score, movements }
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

export function isGameOver(board: Board): boolean {
  const left = moveLeft(board).board
  const right = moveRight(board).board
  const up = moveUp(board).board
  const down = moveDown(board).board

  return (
    boardsEqual(left, board) && 
    boardsEqual(right, board) && 
    boardsEqual(up, board) && 
    boardsEqual(down, board))
}