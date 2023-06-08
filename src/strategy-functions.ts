import { Chess, Move } from "chess.js"

export const getRandomMove = (chessboard: Chess): Move => {
  const moves = chessboard.moves({ verbose: true })
  if (moves.length === 0) throw new Error("No moves available")
  return moves[Math.floor(Math.random() * moves.length)]
}

export const getSuicideMove = (chessboard: Chess): Move => {
  const moves = chessboard.moves({ verbose: true })
  if (moves.length === 0) throw new Error("No moves available")

  for (const move of moves) {
    const tempChessboard = new Chess(chessboard.fen())
    tempChessboard.move({ from: move.from, to: move.to })
    const opponentMoves = tempChessboard.moves({ verbose: true })

    for (const opponentMove of opponentMoves) {
      if (
        opponentMove.to === move.to &&
        (opponentMove.flags.includes("c") || opponentMove.flags.includes("e"))
      ) {
        return move
      }
    }
  }

  return moves[Math.floor(Math.random() * moves.length)]
}

export const getCaptureMove = (chessboard: Chess): Move => {
  const moves = chessboard.moves({ verbose: true })
  if (moves.length === 0) throw new Error("No moves available")

  const captureMoves = moves.filter((move) => move.captured)

  if (captureMoves.length > 0)
    return captureMoves[Math.floor(Math.random() * captureMoves.length)]

  return moves[Math.floor(Math.random() * moves.length)]
}

export const getPacifistMove = (chessboard: Chess): Move => {
  const moves = chessboard.moves({ verbose: true })
  if (moves.length === 0) throw new Error("No moves available")

  const pacificMoves = moves.filter((move) => !move.captured)

  if (pacificMoves.length > 0)
    return pacificMoves[Math.floor(Math.random() * pacificMoves.length)]

  return moves[Math.floor(Math.random() * moves.length)]
}

export const getKamikazeMove = (chessboard: Chess): Move => {
  const moves = chessboard.moves({ verbose: true })
  if (moves.length === 0) throw new Error("No moves available")

  const capturingMoves = moves.filter((move) => move.hasOwnProperty("captured"))

  for (const move of capturingMoves) {
    const tempChessboard = new Chess(chessboard.fen())
    tempChessboard.move({ from: move.from, to: move.to })

    const opponentMoves = tempChessboard.moves({ verbose: true })

    for (const opponentMove of opponentMoves) {
      if (
        opponentMove.to === move.to &&
        (opponentMove.flags.includes("c") || opponentMove.flags.includes("e"))
      ) {
        return move
      }
    }
  }

  return getCaptureMove(chessboard)
}
