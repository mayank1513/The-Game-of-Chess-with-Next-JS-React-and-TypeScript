import styles from "./board.module.scss";
import { p0, pb, pw } from "utils/chess-utils";

type cellProps = {
  piece: string;
  square: string;
  turn: string;
  highlighted: (string | undefined)[];
  isWhite: boolean;
  handleCellClick: (square: string, shouldGetMoves: boolean) => void;
};
export default function Cell({
  piece,
  square,
  turn,
  highlighted,
  isWhite,
  handleCellClick,
}: cellProps) {
  let c = "";
  if (piece == ".") {
    piece = "";
  } else if (piece.match(/[A-Z]/)) {
    piece = pw[p0.indexOf(piece.toLowerCase())];
    c = "w";
  } else {
    piece = pb[p0.indexOf(piece)];
    c = "b";
  }
  return (
    <div
      className={[
        styles.col,
        isWhite ? styles.w : styles.b,
        piece && turn == c && styles.pointer,
        highlighted.includes(square) && styles.highlighted,
      ].join(" ")}
      onClick={() => handleCellClick(square, !!piece && turn == c)}
    >
      {piece}
    </div>
  );
}
