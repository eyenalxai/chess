import { ChessMove, ChessStrategy, MoveOutcome, StrategyRequest } from "@/type"

export const computeMove = async ({
  fen,
  strategy
}: {
  fen: string
  strategy: ChessStrategy
}): Promise<MoveOutcome> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/compute_move`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      fen_string: fen,
      strategy_name: strategy.id
    } as StrategyRequest)
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return await response.json()
}

export const processMove = async (
  chessMove: ChessMove,
  strategyRequest: StrategyRequest
): Promise<MoveOutcome> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/process_move`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chess_move: chessMove,
      strategy_request: strategyRequest
    })
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return await response.json()
}
