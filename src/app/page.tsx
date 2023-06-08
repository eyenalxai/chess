"use client"

import { Chessboard } from "react-chessboard"
import { isDraw, isSomeoneWon, onPieceDrop } from "@/util"
import { useChessGame } from "@/hook"
import { useState } from "react"
import { Strategy } from "@/type"
import { strategyList } from "@/util/strategy"
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from "@mui/material"
import { Chess } from "chess.js"
import { CustomAlert } from "@/component/custom-alert"

export default function Home() {
  const [strategy, setStrategy] = useState<Strategy>(strategyList[0])
  const { chessboard, setChessboard } = useChessGame(strategy)

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          gap: 2,
          marginY: 2
        }}
      >
        <FormControl size="small">
          <InputLabel id="strategy-select-label">STRATEGY</InputLabel>
          <Select
            labelId="strategy-select-label"
            id="strategy-select"
            value={strategy.key}
            label="STRATEGY"
            onChange={(e) =>
              setStrategy(strategyList.find((s) => s.key === e.target.value)!)
            }
          >
            {strategyList.map((strategy) => (
              <MenuItem key={strategy.key} value={strategy.key}>
                {strategy.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button onClick={() => setChessboard(new Chess())}>RESET</Button>
        {isSomeoneWon(chessboard) && (
          <CustomAlert text={`${chessboard.turn() === "w" ? "BLACK" : "WHITE"} WON`} />
        )}
        {isDraw(chessboard) && <CustomAlert text={`DRAW`} />}
      </Box>
      <Chessboard
        position={chessboard.fen()}
        showBoardNotation={false}
        customDarkSquareStyle={{ backgroundColor: "#646464" }}
        customLightSquareStyle={{ backgroundColor: "#323232" }}
        onPieceDrop={(a, b) => onPieceDrop(a, b, chessboard, setChessboard)}
      />
    </Container>
  )
}
