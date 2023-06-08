import { Strategy } from "@/type"
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { strategyList } from "@/util/strategy"

type StrategySelectProps = {
  strategy: Strategy
  setStrategy: (strategy: Strategy) => void
  color: "black" | "white"
}

export const StrategySelect = ({
  strategy,
  setStrategy,
  color
}: StrategySelectProps) => (
  <FormControl
    size="small"
    sx={{
      minWidth: 120
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
      value={strategy.key}
      label={`${color.toUpperCase()} STRATEGY`}
      onChange={(e) => setStrategy(strategyList.find((s) => s.key === e.target.value)!)}
    >
      {strategyList.map((strategy) => (
        <MenuItem key={strategy.key} value={strategy.key}>
          {strategy.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
)
