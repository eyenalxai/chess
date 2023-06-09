import { GameOutcome, isChessMove, isGameOutcome, Player } from "@/type"
import { useEffect, useState } from "react"
import { Chess, Square } from "chess.js"
import { useMutation } from "react-query"
import { computeMove } from "@/fetch"
import { strategyList } from "@/util/strategy"
import { makeMove } from "@/util/move"

export const useChessGame = () => {
  const [chessboard, setChessboard] = useState(new Chess())
  const [blackStrategy, setBlackStrategy] = useState(strategyList[0])
  const [whiteStrategy, setWhiteStrategy] = useState(strategyList[1])
  const [gameOutcome, setGameOutcome] = useState<GameOutcome | undefined>(undefined)
  const [isPlaying, setIsPlaying] = useState(false)
  const [player, setPlayer] = useState<Player | "none">("none")

  const onPieceDrop = (sourceSquare: Square, targetSquare: Square) =>
    makeMove(
      sourceSquare,
      targetSquare,
      chessboard,
      setChessboard,
      setIsPlaying,
      setGameOutcome,
      chessboard.turn() === "w" ? whiteStrategy : blackStrategy
    )

  const { reset, ...mutation } = useMutation(computeMove, {
    onSuccess: (data, variables) => {
      if (isGameOutcome(data)) {
        setIsPlaying(false)
        setGameOutcome(data.game_outcome)
        return
      }

      if (isChessMove(data)) {
        chessboard.move({
          from: data.chess_move.from_square,
          to: data.chess_move.to_square,
          promotion: data.chess_move.promotion
        })
        setChessboard(new Chess(chessboard.fen()))
      }
    },
    onError: (error) => {
      console.error(error)
    }
  })

  useEffect(() => {
    if (!mutation.isIdle && !mutation.isLoading) {
      reset()
    }
  }, [mutation, reset])

  useEffect(() => {
    if (isPlaying && !gameOutcome && mutation.isIdle) {
      const currentTurn = chessboard.turn() === "w" ? "white" : "black"
      if (player !== currentTurn) {
        const strategy = chessboard.turn() === "w" ? whiteStrategy : blackStrategy
        setTimeout(() => {
          mutation.mutate({ fen: chessboard.fen(), strategy: strategy })
        }, 200)
      }
    }
  }, [chessboard, mutation, isPlaying, gameOutcome, player])

  return {
    chessboard,
    setChessboard,
    blackStrategy,
    setBlackStrategy,
    whiteStrategy,
    setWhiteStrategy,
    gameOutcome,
    setGameOutcome,
    isPlaying,
    setIsPlaying,
    player,
    setPlayer,
    onPieceDrop
  }
}
