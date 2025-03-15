import { Player, Players } from "./player";

export type GameMode = "1v1" | "vsComputer";
export type Cell = Player | null;
export type Board = Cell[];

export interface Position {
  row: number;
  col: number;
}

export interface Move {
  player: Player;
  position: Position;
  timestamp: number;
  board?: Board;
}

export interface GameState {
  board: Board;
  currentPlayer: Player;
  winner: Player | "draw" | null;
  gameMode: GameMode;
  players: Players;
  moves: Move[];
  isFirstLaunch: boolean;
  hasGameStarted: boolean;
  timer: {
    X: number;
    O: number;
  };
}
