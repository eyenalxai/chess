import { GameOutcome, isChessMove, isGameOutcome, Player } from "@/type"
import { useEffect, useState } from "react"
import { Chess, Move, Square } from "chess.js"
import { useMutation } from "react-query"
import { computeMove } from "@/fetch"
import { strategyList } from "@/util/strategy"
import { makeMove } from "@/util/move"

export const useChessGame = () => {
  const [blackStrategy, setBlackStrategy] = useState(strategyList[0])
  const [whiteStrategy, setWhiteStrategy] = useState(strategyList[0])
  const [gameOutcome, setGameOutcome] = useState<GameOutcome | undefined>(undefined)
  const [isPlaying, setIsPlaying] = useState(false)
  const [player, setPlayer] = useState<Player | "none">("none")
  const [chessboard, setChessboard] = useState(new Chess())
  const [movesWithoutCapture, setMovesWithoutCapture] = useState(0)
  const [targetMove, setTargetMove] = useState<{
    sourceSquare: Square
    targetSquare: Square
    tempBoard: Chess
  } | null>(null)

  useEffect(() => {
    if (movesWithoutCapture >= 50) {
      setGameOutcome({
        winner: "draw",
        reason: "fifty_moves"
      })
    }
  }, [movesWithoutCapture])

  const trackMovesWithoutCapture = (move: Move) => {
    if (!move.flags.includes("c")) {
      setMovesWithoutCapture(movesWithoutCapture + 1)
    }

    if (move.flags.includes("c")) {
      setMovesWithoutCapture(0)
    }
  }

  const onPieceDrop = (sourceSquare: Square, targetSquare: Square) => {
    const tempBoard = new Chess(chessboard.fen())

    try {
      const move = chessboard.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q"
      })

      trackMovesWithoutCapture(move)

      setChessboard(chessboard)
      setTargetMove({ sourceSquare, targetSquare, tempBoard })
      return true
    } catch (error) {
      return false
    }
  }

  useEffect(() => {
    if (targetMove) {
      makeMove(
        targetMove.sourceSquare,
        targetMove.targetSquare,
        targetMove.tempBoard,
        setChessboard,
        setIsPlaying,
        setGameOutcome,
        chessboard.turn() === "w" ? whiteStrategy : blackStrategy
      ).then((is_valid) => {
        if (!is_valid) {
          chessboard.undo()
          setChessboard(chessboard)
        }
      })
    }
  }, [targetMove])

  const { reset, ...mutation } = useMutation(computeMove, {
    onSuccess: (data) => {
      if (isGameOutcome(data)) {
        setIsPlaying(false)
        setGameOutcome(data.game_outcome)
        return
      }

      if (isChessMove(data)) {
        const move = chessboard.move({
          from: data.chess_move.from_square,
          to: data.chess_move.to_square,
          promotion: data.chess_move.promotion
        })

        trackMovesWithoutCapture(move)

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
    setMovesWithoutCapture,
    onPieceDrop
  }
}
