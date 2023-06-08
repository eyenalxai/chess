import { Chess, Move } from "chess.js"

export type MoveFunctionType =
  | "randomMove"
  | "suicideMove"
  | "captureMove"
  | "pacifistMove"
  | "kamikazeMove"

export type Strategy = {
  key: MoveFunctionType
  name: string
  func: (chessboard: Chess) => Move
}
