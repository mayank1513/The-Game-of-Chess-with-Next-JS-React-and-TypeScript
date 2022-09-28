import { Chess } from "chess.js";

export const p0 = "rnbqkp";
export const pb = "♜♞♝♛♚♟";
export const pw = "♖♘♗♕♔♙";
export const chess = new Chess();

export const getBoard = () =>
  chess
    .ascii()
    .split("\n")
    .slice(1, 9)
    .map((rank) => rank.slice(5, 27).split("  "));
