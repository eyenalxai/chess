import { Chess, Square } from "chess.js"
import { Dispatch, SetStateAction } from "react"
import {
  ChessMove,
  ChessStrategy,
  GameOutcome,
  isChessMove,
  isGameOutcome,
  StrategyRequest
} from "@/type"
import { processMove } from "@/fetch"

export const makeMove = async (
  sourceSquare: Square,
  targetSquare: Square,
  chessboard: Chess,
  setChessboard: Dispatch<SetStateAction<Chess>>,
  setIsPlaying: Dispatch<SetStateAction<boolean>>,
  setGameOutcome: Dispatch<SetStateAction<GameOutcome | undefined>>,
  strategy: ChessStrategy
): Promise<boolean> => {
  try {
    const chessMove: ChessMove = {
      from_square: sourceSquare,
      to_square: targetSquare,
      uci: `${sourceSquare}${targetSquare}q`,
      promotion: "q"
    }

    const strategyRequest: StrategyRequest = {
      fen_string: chessboard.fen(),
      strategy_name: strategy.id
    }

    const moveOutcome = await processMove(chessMove, strategyRequest)

    if (isGameOutcome(moveOutcome)) {
      setIsPlaying(false)
      setGameOutcome(moveOutcome.game_outcome)
      return true
    }

    if (isChessMove(moveOutcome)) {
      setIsPlaying(true)
      return true
    }
  } catch (error) {
    console.error(error)
    return false
  }

  return false
}
