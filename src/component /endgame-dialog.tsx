import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material"
import { Dispatch, SetStateAction } from "react"
import { Chess } from "chess.js"
import { GameOutcome } from "@/type"

type EndgameDialogProps = {
  gameOutcome: GameOutcome | undefined
  setGameOutcome: Dispatch<SetStateAction<GameOutcome | undefined>>
  setChessboard: Dispatch<SetStateAction<Chess>>
  setIsPlaying: Dispatch<SetStateAction<boolean>>
}

export const EndgameDialog = ({
  gameOutcome,
  setGameOutcome,
  setChessboard,
  setIsPlaying
}: EndgameDialogProps) => {
  const handleRestart = () => {
    setChessboard(new Chess())
    setIsPlaying(false)

    setGameOutcome(undefined)
  }

  return (
    <Dialog
      open={gameOutcome !== undefined}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {gameOutcome && (
        <DialogTitle id="alert-dialog-title">{`${gameOutcome.winner.toUpperCase()} ${gameOutcome.reason.toUpperCase()}`}</DialogTitle>
      )}

      <DialogActions>
        <Button onClick={handleRestart} color="primary" autoFocus>
          Restart
        </Button>
      </DialogActions>
    </Dialog>
  )
}
