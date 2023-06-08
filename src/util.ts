import { Chess, Square } from "chess.js"

export const isSomeoneWon = (chessboard: Chess) => {
  return chessboard.isCheckmate()
}

export const isDraw = (chessboard: Chess) => {
  return (
    chessboard.isStalemate() ||
    chessboard.isDraw() ||
    chessboard.isThreefoldRepetition()
  )
}

export const onPieceDrop = (
  sourceSquare: Square,
  targetSquare: Square,
  chessboard: Chess,
  setChessboard: (chessboard: Chess) => void
) => {
  try {
    const tempChessboard = new Chess(chessboard.fen())
    tempChessboard.move({ from: sourceSquare, to: targetSquare, promotion: "q" })
    setChessboard(new Chess(tempChessboard.fen()))
  } catch (e) {
    return false
  }

  return true
}
