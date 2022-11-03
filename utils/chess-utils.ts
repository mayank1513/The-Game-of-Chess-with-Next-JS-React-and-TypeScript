import { Chess } from "chess.js";

export const p0 = "rnbqkp";
export const pb = "♜♞♝♛♚♟";
export const pw = "♖♘♗♕♔♙";
export const chess = new Chess();

export const files = "abcdefgh".split("");
export const ranks = "87654321".split("");

export const getBoard = () =>
  chess
    .ascii()
    .split("\n")
    .slice(1, 9)
    .map((rank) => rank.slice(5, 27).split("  "));
