import {
  Box,
  FormControl,
  FormGroup,
  InputLabel,
  MenuItem,
  Select
} from "@mui/material"
import { ChessStrategy } from "@/type"
import { strategyList } from "@/util/strategy"
import { Dispatch, SetStateAction } from "react"
import { Chess } from "chess.js"

type StrategySelectProps = {
  strategy: ChessStrategy
  setStrategy: Dispatch<SetStateAction<ChessStrategy>>
  chessboard: Chess
  setChessboard: Dispatch<SetStateAction<Chess>>
  isPlaying: boolean
  setIsPlaying: Dispatch<SetStateAction<boolean>>
  color: "black" | "white"
}

export const StrategySelect = ({
  strategy,
  setStrategy,
  chessboard,
  setChessboard,
  isPlaying,
  setIsPlaying,
  color
}: StrategySelectProps) => (
  <FormControl
    size="small"
    sx={{
      minWidth: 150
    }}
  >
    <InputLabel
      size="small"
      id={`${color}-strategy-select-label`}
    >{`${color.toUpperCase()} STRATEGY`}</InputLabel>
    <Select
      size="small"
      labelId={`${color}-strategy-select-label`}
      id={`${color}-strategy-select`}
      value={strategy.id}
      label={`${color.toUpperCase()} STRATEGY`}
      onChange={(e) => {
        const selectedStrategy = strategyList.find((s) => s.id === e.target.value)
        if (selectedStrategy) {
          const wasPlaying = isPlaying
          if (wasPlaying) {
            setIsPlaying(false)
          }
          setStrategy(selectedStrategy)
          const copyChessboard = new Chess(chessboard.fen())
          setChessboard(copyChessboard)
          if (wasPlaying) {
            setTimeout(() => {
              setIsPlaying(true)
            }, 100)
          }
        }
      }}
    >
      {strategyList.map((strategyOption) => (
        <MenuItem key={strategyOption.id} value={strategyOption.id}>
          {strategyOption.displayName}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
)

type StrategiesProps = {
  blackStrategy: ChessStrategy
  setBlackStrategy: Dispatch<SetStateAction<ChessStrategy>>
  whiteStrategy: ChessStrategy
  setWhiteStrategy: Dispatch<SetStateAction<ChessStrategy>>
  chessBoard: Chess
  setChessboard: Dispatch<SetStateAction<Chess>>
  isPlaying: boolean
  setIsPlaying: Dispatch<SetStateAction<boolean>>
}

export const Strategies = ({
  blackStrategy,
  setBlackStrategy,
  whiteStrategy,
  setWhiteStrategy,
  chessBoard,
  setChessboard,
  isPlaying,
  setIsPlaying
}: StrategiesProps) => {
  return (
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
          chessboard={chessBoard}
          setChessboard={setChessboard}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          color="black"
        />
        <StrategySelect
          strategy={whiteStrategy}
          setStrategy={setWhiteStrategy}
          chessboard={chessBoard}
          setChessboard={setChessboard}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          color="white"
        />
      </Box>
    </FormGroup>
  )
}
