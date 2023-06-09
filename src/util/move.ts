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
) => {
  try {
    const chessMove: ChessMove = {
      from_square: sourceSquare,
      to_square: targetSquare,
      promotion: "q"
    }

    const strategyRequest: StrategyRequest = {
      fen_string: chessboard.fen(),
      strategy_name: strategy.id
    }

    const moveOutcome = await processMove(chessMove, strategyRequest)

    if (isGameOutcome(moveOutcome)) {
      // The game is over
      setIsPlaying(false)
      setGameOutcome(moveOutcome.game_outcome)
      return
    }

    if (isChessMove(moveOutcome)) {
      chessboard.move({
        from: moveOutcome.chess_move.from_square,
        to: moveOutcome.chess_move.to_square,
        promotion: moveOutcome.chess_move.promotion
      })
      setChessboard(new Chess(chessboard.fen()))
      setIsPlaying(true)
    }
  } catch (error) {
    console.error(error)
  }
}
