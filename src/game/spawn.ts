import type { Board, Position } from "./types"


export function getEmptyCells(board: Board): Position[] {
    const emptyCells: Position[] = [];

    for (let r = 0; r < board.length; r ++){
        for (let c = 0; c < board[0].length; c ++){
            if (board[r][c] === 0) {
                emptyCells.push([r, c])
            }
        }
    }

    return emptyCells
}

export function spawnTile(board: Board): Board {
    const emptyCells = getEmptyCells(board);

    if (emptyCells.length === 0){ return board; }

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const [row, col] = emptyCells[randomIndex];
    const value = Math.random() > .9 ? 4 : 2;
    const newBoard = board.map(row => [...row])

    newBoard[row][col] = value

    return newBoard
}