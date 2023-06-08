"use client"

import { Chessboard } from "react-chessboard"
import { Box, Button, Container } from "@mui/material"
import { useMutation } from "react-query"
import { Chess } from "chess.js"
import { useEffect, useState } from "react"
import { fetchMove } from "@/fetch"
import { ChessStrategy, GameOutcome, isChessMove, isGameOutcome } from "@/type"
import { Strategies } from "@/component /strategy-select"
import { strategyList } from "@/util/strategy"
import { EndgameDialog } from "@/component /endgame-dialog"

export default function Home() {
  const [chessboard, setChessboard] = useState(new Chess())
  const [blackStrategy, setBlackStrategy] = useState<ChessStrategy>(strategyList[0])
  const [whiteStrategy, setWhiteStrategy] = useState<ChessStrategy>(strategyList[1])
  const [gameOutcome, setGameOutcome] = useState<GameOutcome | undefined>(undefined)
  const [isPlaying, setIsPlaying] = useState(false)

  const { reset, ...mutation } = useMutation(fetchMove, {
    onSuccess: (data, variables) => {
      if (isGameOutcome(data)) {
        console.log(data)
        setIsPlaying(false)
        setGameOutcome(data.game_outcome)
        return
      }

      if (isChessMove(data)) {
        const chess = new Chess(variables.fen)
        chess.move({
          from: data.from_square,
          to: data.to_square,
          promotion: data.promotion
        })
        setChessboard(new Chess(chess.fen()))
      }
    },
    onError: (error) => {
      // handle the error
      console.error(error)
    }
  })

  useEffect(() => {
    if (!mutation.isIdle && !mutation.isLoading) {
      // Reset the mutation state before making a new request
      reset()
    }
  }, [mutation, reset])

  useEffect(() => {
    if (isPlaying && !gameOutcome) {
      if (mutation.isIdle) {
        // Automatically fetch the next move if it's not currently fetching
        const strategy = chessboard.turn() === "w" ? whiteStrategy : blackStrategy
        setTimeout(() => {
          mutation.mutate({ fen: chessboard.fen(), strategy: strategy })
        }, 200)
      }
    }
  }, [chessboard, mutation, isPlaying, gameOutcome])

  return (
    <Container
      maxWidth="sm"
      sx={{
        paddingTop: 2
      }}
    >
      <EndgameDialog
        gameOutcome={gameOutcome}
        setGameOutcome={setGameOutcome}
        setChessboard={setChessboard}
        setIsPlaying={setIsPlaying}
      />
      <Chessboard
        animationDuration={200}
        position={chessboard.fen()}
        showBoardNotation={false}
        customDarkSquareStyle={{ backgroundColor: "#646464" }}
        customLightSquareStyle={{ backgroundColor: "#323232" }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          gap: 1,
          marginY: 2
        }}
      >
        <Strategies
          blackStrategy={blackStrategy}
          setBlackStrategy={setBlackStrategy}
          whiteStrategy={whiteStrategy}
          setWhiteStrategy={setWhiteStrategy}
          chessBoard={chessboard}
          setChessboard={setChessboard}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
        <Button
          variant="outlined"
          sx={{
            width: 20
          }}
          onClick={isPlaying ? () => setIsPlaying(false) : () => setIsPlaying(true)}
        >
          {isPlaying ? "STOP" : "START"}
        </Button>
      </Box>
    </Container>
  )
}
