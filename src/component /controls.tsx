import { Strategies } from "@/component /strategy-select"
import { Box, Button } from "@mui/material"
import { ChessStrategy, Player } from "@/type"
import { Dispatch, SetStateAction } from "react"
import { Chess } from "chess.js"
import { PlayerSelect } from "@/component /player-select"

type ControlsProps = {
  blackStrategy: ChessStrategy
  setBlackStrategy: Dispatch<SetStateAction<ChessStrategy>>
  whiteStrategy: ChessStrategy
  setWhiteStrategy: Dispatch<SetStateAction<ChessStrategy>>
  chessboard: Chess
  setChessboard: Dispatch<SetStateAction<Chess>>
  isPlaying: boolean
  setIsPlaying: Dispatch<SetStateAction<boolean>>
  player: Player | "none"
  setPlayer: Dispatch<SetStateAction<Player | "none">>
  setMovesWithoutCapture: Dispatch<SetStateAction<number>>
}

export const Controls = ({
  blackStrategy,
  setBlackStrategy,
  whiteStrategy,
  setWhiteStrategy,
  chessboard,
  setChessboard,
  isPlaying,
  setIsPlaying,
  player,
  setPlayer,
  setMovesWithoutCapture
}: ControlsProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
        gap: 2,
        marginY: 2
      }}
    >
      <PlayerSelect player={player} setPlayer={setPlayer} />
      <Strategies
        blackStrategy={blackStrategy}
        setBlackStrategy={setBlackStrategy}
        whiteStrategy={whiteStrategy}
        setWhiteStrategy={setWhiteStrategy}
        chessBoard={chessboard}
        setChessboard={setChessboard}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        player={player}
      />
      <Box
        sx={{
          display: "flex",
          gap: 1
        }}
      >
        <Button
          variant="outlined"
          sx={{
            width: 20
          }}
          onClick={isPlaying ? () => setIsPlaying(false) : () => setIsPlaying(true)}
        >
          {isPlaying ? "STOP" : "START"}
        </Button>
        <Button
          variant="outlined"
          sx={{
            width: 20
          }}
          onClick={() => {
            setIsPlaying(false)
            setTimeout(() => {
              setChessboard(new Chess())
              setMovesWithoutCapture(0)
            }, 300)
          }}
        >
          RESET
        </Button>
      </Box>
    </Box>
  )
}
