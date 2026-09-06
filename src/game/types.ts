export type Board = number[][]

export type Moves = "Up" | "Down" | "Left" | "Right"

export type Position = [number, number]

export type MoveRowResult = {
    row: number[]
    score: number
}

export type MoveBoardResult = {
    board: number[][]
    score: number
}