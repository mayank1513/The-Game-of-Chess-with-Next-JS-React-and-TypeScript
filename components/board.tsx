import { useEffect, useRef, useState } from "react";
import styles from "./board.module.scss";
import { chess, getBoard, ranks, files } from "utils/chess-utils";
import { Move } from "chess.js";
import { calculateBestMove, initGame } from "chess-ai";
import Loader from "./loader";
import Cell from "./cell";

export default function Board() {
  const [pieces, setPieces] = useState<string[][]>(
    ranks.map(() => new Array(8).fill(" "))
  );
  const workerRef = useRef<Worker>();
  const [highlighted, setHighlighted] = useState<(string | undefined)[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [turn, setTurn] = useState("w");
  const [inCheck, setInCheck] = useState(false);
  const [movesWithPromotion, setMovesWithPromotion] = useState<string[]>([]);
  const isTwoPlayer = false;
  useEffect(() => {
    workerRef.current = new Worker(
      new URL("../utils/worker.ts", import.meta.url)
    );
    workerRef.current.onmessage = (e: MessageEvent) => {
      console.log("Hi from UI", e);
    };
    workerRef.current.postMessage("Hi -- from UI");
    initGame(chess, 1);
    setPieces(getBoard());
    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  function makeMove(mv: any, isAI: boolean) {
    let move;
    if (!isAI && movesWithPromotion.includes(mv.to)) {
      chess.move({ ...mv, promotion: "q" });
    } else move = chess.move(mv);
    setPieces(getBoard());
    setHighlighted([move?.to, move?.from]);
    setIsLoading(!isAI);
    setTurn(chess.turn());
    setInCheck(chess.inCheck());
    if (chess.isGameOver()) {
      setTimeout(() => {
        alert("Game Over");
        chess.reset();
        setTurn("b");
        setInCheck(false);
        setPieces(getBoard());
        setHighlighted([]);
        setIsLoading(false);
      }, 100);
    }
  }

  function handleCellClick(square: string, shouldGetMoves: boolean) {
    if (highlighted.slice(1).includes(square)) {
      makeMove(
        {
          to: square,
          // @ts-ignore
          from: highlighted[0],
        },
        false
      );
      if (isTwoPlayer) {
        setIsLoading(false);
      } else
        setTimeout(() => {
          const aiMove = calculateBestMove();
          if (aiMove) makeMove(aiMove, true);
        }, 200);
    } else if (shouldGetMoves) {
      const mvs = chess.moves({
        // @ts-ignore
        square,
        verbose: true,
      }) as Move[];
      setHighlighted([square, ...mvs.map(({ to }) => to)]);
      setMovesWithPromotion(
        mvs.filter(({ flags }) => flags.includes("p")).map(({ to }) => to)
      );
    } else {
      setHighlighted([]);
    }
  }
  return (
    <div
      className={[
        styles.board,
        turn == "b" ? styles.tb : styles.tw,
        inCheck ? styles.inCheck : "",
      ].join(" ")}
    >
      {ranks.map((rank, i) => (
        <div className={styles.row} key={i}>
          {files.map((file, j) => (
            <Cell
              key={`${i},${j}`}
              {...{
                piece: pieces[i][j],
                square: file + rank,
                handleCellClick,
                highlighted,
                turn,
                isWhite: (i + j) % 2 == 0,
              }}
            />
          ))}
        </div>
      ))}
      <Loader hidden={!isLoading} />
    </div>
  );
}
