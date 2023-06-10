import { Chess } from "chess.js"

export const calculateScore = (chessboard: Chess) => {
  const pieceValues = {
    p: 1,
    n: 3,
    b: 3,
    r: 5,
    q: 9,
    k: 100
  }

  const pieceCounts = chessboard.board().reduce(
    (acc, row) => {
      if (row) {
        for (let piece of row) {
          if (piece) {
            // Add the value of the piece to the player's total
            acc[piece.color] += pieceValues[piece.type]
          }
        }
      }
      return acc
    },
    { w: 0, b: 0 }
  )

  return (pieceCounts["w"] / (pieceCounts["w"] + pieceCounts["b"])) * 100
}
