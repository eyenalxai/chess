import { ChessStrategy, MoveOutcome, StrategyRequest } from "@/type"

export const fetchMove = async ({
  fen,
  strategy
}: {
  fen: string
  strategy: ChessStrategy
}): Promise<MoveOutcome> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/chess`, {
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
