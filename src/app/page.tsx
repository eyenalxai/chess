"use client"

import { Chessboard } from "react-chessboard"
import { onPieceDrop } from "@/util"
import { useChessGame } from "@/hook"
import { Box, Container, FormControlLabel, FormGroup, Switch } from "@mui/material"
import { StrategySelect } from "@/component/strategy-select"
import { ChessboardReset } from "@/component/reset"
import { GameStatus } from "@/component/game-status"

export default function Home() {
  const {
    chessboard,
    setChessboard,
    whiteStrategy,
    setWhiteStrategy,
    blackStrategy,
    setBlackStrategy,
    isAutoMode,
    setIsAutoMode
  } = useChessGame()

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          gap: 1,
          marginY: 2
        }}
      >
        <FormGroup>
          <Box
            sx={{
              display: "flex",
              gap: 1
            }}
          >
            <StrategySelect
              strategy={blackStrategy}
              setStrategy={setBlackStrategy}
              color="black"
            />
            <StrategySelect
              strategy={whiteStrategy}
              setStrategy={setWhiteStrategy}
              color="white"
            />
          </Box>
        </FormGroup>
        <ChessboardReset setChessboard={setChessboard} />
        <FormControlLabel
          control={
            <Switch
              size="small"
              checked={isAutoMode}
              onChange={() => setIsAutoMode(!isAutoMode)}
            />
          }
          label={isAutoMode ? "AUTO" : "MANU"}
        />
        <GameStatus chessboard={chessboard} />
      </Box>
      <Chessboard
        position={chessboard.fen()}
        showBoardNotation={true}
        customDarkSquareStyle={{ backgroundColor: "#646464" }}
        customLightSquareStyle={{ backgroundColor: "#323232" }}
        onPieceDrop={(a, b) => onPieceDrop(a, b, chessboard, setChessboard)}
      />
    </Container>
  )
}
