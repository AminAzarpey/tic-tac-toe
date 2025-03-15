import { GameState, GameMode } from "./game";
import { Player } from "./player";

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
  setGameMode: (mode: GameMode) => void;
  setPlayerName: (player: Player, name: string) => void;
  setFirstLaunch: (value: boolean) => void;
  setHasGameStarted: (value: boolean) => void;
  updateTimer: (player: Player) => void;
  resetTimer: () => void;
}
