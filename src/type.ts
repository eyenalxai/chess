import { Chess, Move } from "chess.js"

export type MoveFunctionType =
  | "randomMove"
  | "suicideMove"
  | "captureMove"
  | "pacifistMove"
  | "kamikazeMove"
  | "stockfishMove0.1"
  | "stockfishMove0.5"
  | "stockfishMove1"
  | "stockfishMove2"
  | "stockfishMove5"

export type Strategy = {
  key: MoveFunctionType
  name: string
  func: (chessboard: Chess) => Move | Promise<Move>
}

export type StockfishResponse = {
  from_square: string
  to_square: string
  promotion?: string
}

export type StockFishRequest = {
  fen_string: string
  time: number // in ms
}
