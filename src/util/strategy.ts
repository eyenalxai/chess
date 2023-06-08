import { ChessStrategy } from "@/type"

export const strategyList: ChessStrategy[] = [
  { id: "random", displayName: "RANDOM" },
  { id: "pacifist", displayName: "PACIFIST" },
  { id: "pawnstorm", displayName: "PAWNSTORM" },
  { id: "predator", displayName: "PREDATOR" },
  { id: "kamikaze", displayName: "KAMIKAZE" },
  { id: "stockfish-100", displayName: "STOCKFISH 100" },
  { id: "stockfish-500", displayName: "STOCKFISH 500" },
  { id: "stockfish-1000", displayName: "STOCKFISH 1000" }
]
