import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { Player } from "@/type"
import { Dispatch, SetStateAction } from "react"

export const players: Player[] = ["white", "black"]

type PlayerSelectProps = {
  player: Player | "none"
  setPlayer: Dispatch<SetStateAction<Player | "none">>
}

export const PlayerSelect = ({ player, setPlayer }: PlayerSelectProps) => {
  return (
    <FormControl
      size="small"
      sx={{
        width: 150
      }}
    >
      <InputLabel size="small" id="player-select-label">
        PLAY AS
      </InputLabel>
      <Select
        size="small"
        labelId="player-select-label"
        id="player-select"
        value={player}
        label="PLAY AS"
        onChange={(e) => {
          const selectedPlayer = e.target.value as Player
          setPlayer(selectedPlayer)
        }}
      >
        {[...players, "none"].map((player) => (
          <MenuItem key={player} value={player}>
            {player.toUpperCase()}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
