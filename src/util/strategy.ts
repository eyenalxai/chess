import {
  getCaptureMove,
  getKamikazeMove,
  getPacifistMove,
  getRandomMove,
  getStockfishMove,
  getSuicideMove
} from "@/strategy-functions"
import { Strategy } from "@/type"

export const strategyList: Strategy[] = [
  { key: "randomMove", name: "RANDOM", func: getRandomMove },
  { key: "kamikazeMove", name: "KAMIKAZE", func: getKamikazeMove },
  { key: "pacifistMove", name: "PACIFIST", func: getPacifistMove },
  { key: "suicideMove", name: "SUICIDE", func: getSuicideMove },
  { key: "captureMove", name: "CAPTURE", func: getCaptureMove },
  {
    key: "stockfishMove0.1",
    name: "STOCKFISH 0.1",
    func: (chessboard) => getStockfishMove(chessboard, 100)
  },
  {
    key: "stockfishMove0.5",
    name: "STOCKFISH 0.5",
    func: (chessboard) => getStockfishMove(chessboard, 500)
  },
  {
    key: "stockfishMove1",
    name: "STOCKFISH 1",
    func: (chessboard) => getStockfishMove(chessboard, 1000)
  },
  {
    key: "stockfishMove2",
    name: "STOCKFISH 2",
    func: (chessboard) => getStockfishMove(chessboard, 2000)
  },
  {
    key: "stockfishMove5",
    name: "STOCKFISH 5",
    func: (chessboard) => getStockfishMove(chessboard, 5000)
  }
]
