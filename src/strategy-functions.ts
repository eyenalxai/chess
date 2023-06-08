import { Chess, Move, Square } from "chess.js"
import { StockFishRequest, StockfishResponse } from "@/type"

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

export const getStockfishMove = async (
  chessboard: Chess,
  time: number
): Promise<Move> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/stockfish`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      fen_string: chessboard.fen(),
      time: time
    } as StockFishRequest)
  })

  if (!response.ok) {
    return getRandomMove(chessboard)
  }

  const stockfishMove: StockfishResponse = await response.json()

  const tempChessboard = new Chess(chessboard.fen())
  return tempChessboard.move({
    from: stockfishMove.from_square as Square,
    to: stockfishMove.to_square as Square,
    promotion: stockfishMove.promotion
  })
}
