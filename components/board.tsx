import styles from "./board.module.scss";

export default function Board() {
  return (
    <div className={styles.board}>
      {new Array(8).fill(0).map((_, i) => (
        <div className={styles.row} key={i}>
          {new Array(8).fill(0).map((_, j) => (
            <div
              className={[
                styles.col,
                (i + j) % 2 == 0 ? styles.w : styles.b,
              ].join(" ")}
              key={`${i}, ${j}`}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
}
