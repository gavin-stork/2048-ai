export type Board = number[][]

export type Moves = "Up" | "Down" | "Left" | "Right"

export type Position = [number, number]

export type MoveRowResult = {
    row: number[]
    score: number
    movements: {
        fromCol: number
        toCol: number
    }[]
}

export type MoveBoardResult = {
    board: number[][]
    score: number
    movements: TileMovement[]
}

export type Tile = {
    id: number
    value: number
    row: number
    col: number
}

export type TileMovement = {
    from: Position
    to: Position
}

export type AnimationState = {
    startBoard: Board
    movements: TileMovement[]
} | null