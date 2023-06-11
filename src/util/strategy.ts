import { ChessStrategy } from "@/type"

export const strategyList: ChessStrategy[] = [
  { id: "random-move", displayName: "RANDOM MOVE" },
  { id: "elusive", displayName: "ELUSIVE" },
  { id: "predator", displayName: "PREDATOR" },
  { id: "monochrome", displayName: "MONOCHROME" },
  { id: "dichrome", displayName: "DICHROME" },
  { id: "checkmate-express", displayName: "CHECKMATE EXPRESS" },
  { id: "stockfish-1", displayName: "STOCKFISH 1" },
  { id: "stockfish-10", displayName: "STOCKFISH 10" },
  { id: "stockfish-100", displayName: "STOCKFISH 100" },
  { id: "stockfish-500", displayName: "STOCKFISH 500" },
  { id: "stockfish-1000", displayName: "STOCKFISH 1000" }
]
