import {
  getCaptureMove,
  getKamikazeMove,
  getPacifistMove,
  getRandomMove,
  getSuicideMove
} from "@/strategy-functions"
import { Strategy } from "@/type"

export const strategyList: Strategy[] = [
  { key: "randomMove", name: "RANDOM", func: getRandomMove },
  { key: "kamikazeMove", name: "KAMIKAZE", func: getKamikazeMove },
  { key: "pacifistMove", name: "PACIFIST", func: getPacifistMove },
  { key: "suicideMove", name: "SUICIDE", func: getSuicideMove },
  { key: "captureMove", name: "CAPTURE", func: getCaptureMove }
]
