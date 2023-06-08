import { Strategy } from "@/type"
import { useCallback, useEffect, useState } from "react"
import { Chess } from "chess.js"
import { isDraw, isSomeoneWon } from "@/util"
import { strategyList } from "@/util/strategy"

export const useChessGame = () => {
  const [whiteStrategy, setWhiteStrategy] = useState<Strategy>(strategyList[0])
  const [blackStrategy, setBlackStrategy] = useState<Strategy>(strategyList[0])
  const [isAutoMode, setIsAutoMode] = useState(false)
  const [chessboard, setChessboard] = useState(new Chess())

  const moveFunction = useCallback(
    (chessboard: Chess) =>
      chessboard.turn() === "w"
        ? whiteStrategy.func(chessboard)
        : blackStrategy.func(chessboard),
    [whiteStrategy, blackStrategy]
  )

  useEffect(() => {
    if (isSomeoneWon(chessboard) || isDraw(chessboard)) return
    if (!isAutoMode && chessboard.turn() === "w") return

    const timer = setTimeout(async () => {
      try {
        const move = await moveFunction(chessboard)
        chessboard.move(move)
        setChessboard(new Chess(chessboard.fen()))
      } catch (e) {
        console.log(e)
        return
      }
    }, 400)

    return () => clearTimeout(timer)
  }, [chessboard, moveFunction, isAutoMode])

  return {
    chessboard,
    setChessboard,
    whiteStrategy,
    setWhiteStrategy,
    blackStrategy,
    setBlackStrategy,
    isAutoMode,
    setIsAutoMode
  }
}
