import { Strategy } from "@/type"
import { useCallback, useEffect, useState } from "react"
import { Chess } from "chess.js"
import { isDraw, isSomeoneWon } from "@/util"

export const useChessGame = (moveStrategy: Strategy) => {
  const [chessboard, setChessboard] = useState(new Chess())

  const moveFunction = useCallback(
    (chessboard: Chess) => moveStrategy.func(chessboard),
    [moveStrategy]
  )

  useEffect(() => {
    if (isSomeoneWon(chessboard) || isDraw(chessboard)) return

    if (chessboard.turn() !== "b") return

    try {
      const move = moveFunction(chessboard)
      chessboard.move(move)
      setChessboard(new Chess(chessboard.fen()))
    } catch (e) {
      console.log(e)
      return
    }
  }, [chessboard, moveFunction])

  return { chessboard, setChessboard }
}
