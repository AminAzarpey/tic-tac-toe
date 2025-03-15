export type Player = "X" | "O";
export type Cell = Player | null;
export type Board = Cell[];

export type GameMode = "1v1" | "vsComputer";

export type GameState = {
  board: Board;
  currentPlayer: Player;
  winner: Player | "draw" | null;
  gameMode: GameMode;
  players: {
    X: string;
    O: string;
  };
  history: {
    board: Board;
    player: Player;
    position: number;
  }[];
};

export type Theme = {
  primary: string;
  secondary: string;
  accent: string;
  neutral: string;
  background: string;
};
