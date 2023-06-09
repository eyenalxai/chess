import { ChessStrategy } from "@/type"

export const strategyList: ChessStrategy[] = [
  { id: "random", displayName: "RANDOM" },
  { id: "pacifist", displayName: "PACIFIST" },
  { id: "pawnstorm", displayName: "PAWNSTORM" },
  { id: "predator", displayName: "PREDATOR" },
  { id: "kamikaze", displayName: "KAMIKAZE" },
  { id: "chroma", displayName: "CHROMA" },
  { id: "contrast", displayName: "CONTRAST" },
  { id: "mirror", displayName: "MIRROR" },
  { id: "stockfish-1", displayName: "STOCKFISH 1" },
  { id: "stockfish-10", displayName: "STOCKFISH 10" },
  { id: "stockfish-100", displayName: "STOCKFISH 100" },
  { id: "stockfish-500", displayName: "STOCKFISH 500" },
  { id: "stockfish-1000", displayName: "STOCKFISH 1000" }
]
