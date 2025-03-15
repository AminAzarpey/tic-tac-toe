export type Player = "X" | "O";
export type GameMode = "1v1" | "vsComputer";

export interface Players {
  X: string;
  O: string;
}

export interface Move {
  player: Player;
  position: number;
  timestamp: number;
}

export interface GameState {
  board: (Player | null)[];
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

export interface GameStore extends GameState {
  makeMove: (position: number) => void;
  undoMove: () => void;
  resetGame: () => void;
  initializeGame: (
    gameMode: GameMode,
    player1Name: string,
    player2Name: string
  ) => void;
  setFirstLaunchComplete: () => void;
}
