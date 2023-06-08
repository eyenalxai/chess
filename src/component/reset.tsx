import { Chess } from "chess.js"
import { Button } from "@mui/material"

type ChessboardResetProps = {
  setChessboard: (chessboard: Chess) => void
}

export const ChessboardReset = ({ setChessboard }: ChessboardResetProps) => (
  <Button
    sx={{
      marginRight: 1
    }}
    size="small"
    onClick={() => setChessboard(new Chess())}
  >
    RESET
  </Button>
)
