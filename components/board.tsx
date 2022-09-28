import { Chess } from "chess.js";
import { useEffect, useState } from "react";
import styles from "./board.module.scss";
import { p0, pb, pw } from "utils/chess-utils";

export default function Board() {
  const [pieces, setPieces] = useState(
    new Array(8).fill(0).map(() => new Array(8).fill(""))
  );
  useEffect(() => {
    const chess = new Chess();
    const b = chess
      .ascii()
      .split("\n")
      .slice(1, 9)
      .map((rank) => rank.slice(5, 27).split("  "));
    setPieces(b);
  }, []);
  return (
    <div className={styles.board}>
      {new Array(8).fill(0).map((_, i) => (
        <div className={styles.row} key={i}>
          {new Array(8).fill(0).map((_, j) => {
            let p = pieces[i][j];
            if (p == ".") {
              p = "";
            } else if (p.match(/[A-Z]/)) {
              p = pw[p0.indexOf(p.toLowerCase())];
            } else {
              p = pb[p0.indexOf(p)];
            }
            return (
              <div
                className={[
                  styles.col,
                  (i + j) % 2 == 0 ? styles.w : styles.b,
                ].join(" ")}
                key={`${i}, ${j}`}
              >
                {p}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
