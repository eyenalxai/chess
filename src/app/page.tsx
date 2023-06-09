"use client"

import { Chessboard } from "react-chessboard"
import { Container } from "@mui/material"
import { EndgameDialog } from "@/component /endgame-dialog"
import { Controls } from "@/component /controls"
import { useChessGame } from "@/util/chess-hook"

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
      />
      <Chessboard
        arePiecesDraggable={player !== undefined}
        boardOrientation={player === "black" ? "black" : "white"}
        animationDuration={200}
        onPieceDrop={(a, b) => onPieceDrop(a, b)}
        position={chessboard.fen()}
        showBoardNotation={false}
        customDarkSquareStyle={{ backgroundColor: "#646464" }}
        customLightSquareStyle={{ backgroundColor: "#323232" }}
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
      />
    </Container>
  )
}
