import { Chess } from "chess.js"
import { isDraw, isSomeoneWon } from "@/util"
import { CustomAlert } from "@/component/custom-alert"

export const GameStatus = ({ chessboard }: { chessboard: Chess }) => (
  <>
    {isSomeoneWon(chessboard) && (
      <CustomAlert text={`${chessboard.turn() === "w" ? "BLACK" : "WHITE"}`} />
    )}
    {isDraw(chessboard) && <CustomAlert text={`DRAW`} />}
  </>
)
