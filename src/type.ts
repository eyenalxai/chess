export type StrategyMap = {
  random: "RANDOM"
  pacifist: "PACIFIST"
  "stockfish-100": "STOCKFISH 100"
  "stockfish-500": "STOCKFISH 500"
  "stockfish-1000": "STOCKFISH 1000"
}

export type StrategyIdentifier = keyof StrategyMap
export type StrategyName = StrategyMap[StrategyIdentifier]

export type ChessStrategy = {
  id: StrategyIdentifier
  displayName: StrategyName
}

export type MoveRequest = {
  fen_string: string
  strategy_name: StrategyIdentifier
}

export type Winner = "white" | "black" | "draw"

export type Reason =
  | "checkmate"
  | "stalemate"
  | "insufficient_material"
  | "seventyfive_moves"
  | "fivefold_repetition"
  | "fifty_moves"
  | "threefold_repetition"
  | "variant_win"
  | "variant_loss"
  | "variant_draw"

export type GameOutcome = {
  winner: Winner
  reason: Reason
  ended: boolean
}

export type ChessMove =
  | {
      from_square: string
      to_square: string
      promotion?: string
    }
  | {
      game_outcome: GameOutcome
    }

export const isChessMove = (
  data: ChessMove
): data is {
  from_square: string
  to_square: string
  promotion?: string
} =>
  (
    data as {
      from_square: string
      to_square: string
      promotion?: string
    }
  ).from_square !== null

export const isGameOutcome = (
  data: ChessMove
): data is {
  game_outcome: GameOutcome
} => (data as { game_outcome: GameOutcome }).game_outcome !== null
