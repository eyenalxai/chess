import { Chess, Square } from "chess.js"
import { Dispatch, SetStateAction } from "react"

export const makeMove = (
  sourceSquare: Square,
  targetSquare: Square,
  chessboard: Chess,
  setChessboard: Dispatch<SetStateAction<Chess>>,
  setIsPlaying: Dispatch<SetStateAction<boolean>>
) => {
  try {
    const tempChessboard = new Chess(chessboard.fen())
    tempChessboard.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q"
    })
    setChessboard(tempChessboard)
    setIsPlaying(true)
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
