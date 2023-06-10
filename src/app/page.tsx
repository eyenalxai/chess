"use client"

import { Chessboard } from "react-chessboard"
import { Box, Container, LinearProgress } from "@mui/material"
import { EndgameDialog } from "@/component /endgame-dialog"
import { Controls } from "@/component /controls"
import { useChessGame } from "@/util/chess-hook"
import { calculateScore } from "@/util/score"

export default function Home() {
  const {
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
  } = useChessGame()

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
        setMovesWithoutCapture={setMovesWithoutCapture}
      />
      <Box
        sx={{
          width: "100%",
          height: "auto",
          maxWidth: "400px", // maximum size for desktop and iPad
          margin: "0 auto" // center the board
        }}
      >
        <Chessboard
          arePiecesDraggable={player !== "none"}
          boardOrientation={player === "black" ? "black" : "white"}
          animationDuration={200}
          onPieceDrop={(a, b) => onPieceDrop(a, b)}
          position={chessboard.fen()}
          showBoardNotation={false}
          customDarkSquareStyle={{ backgroundColor: "#646464" }}
          customLightSquareStyle={{ backgroundColor: "#323232" }}
        />
        <LinearProgress
          sx={{
            marginTop: 2
          }}
          variant="determinate"
          value={calculateScore(chessboard)}
        />

        <Controls
          blackStrategy={blackStrategy}
          setBlackStrategy={setBlackStrategy}
          whiteStrategy={whiteStrategy}
          setWhiteStrategy={setWhiteStrategy}
          chessboard={chessboard}
          setChessboard={setChessboard}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          player={player}
          setPlayer={setPlayer}
          setMovesWithoutCapture={setMovesWithoutCapture}
        />
      </Box>
    </Container>
  )
}
