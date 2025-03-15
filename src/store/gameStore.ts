import { create } from "zustand";
import { persist } from "zustand/middleware";
import { GameState, Player, GameMode, Move } from "../types";

interface Players {
  X: string;
  O: string;
}

const initialState: GameState = {
  board: Array(9).fill(null),
  currentPlayer: "X",
  winner: null,
  gameMode: "1v1",
  players: {
    X: "Player 1",
    O: "Player 2",
  },
  moves: [],
  isFirstLaunch: true,
  hasGameStarted: false,
  timer: {
    X: 0,
    O: 0,
  },
};

const calculateWinner = (board: (Player | null)[]): Player | "draw" | null => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  for (const combo of lines) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a] as Player;
    }
  }

  if (board.every((cell) => cell !== null)) {
    return "draw";
  }

  return null;
};

const computerMove = (board: (Player | null)[]): number => {
  const availablePositions = board
    .map((cell, index) => (cell === null ? index : -1))
    .filter((pos) => pos !== -1);

  return availablePositions[
    Math.floor(Math.random() * availablePositions.length)
  ];
};

export const useGameStore = create<
  GameState & {
    makeMove: (position: number) => void;
    undoMove: () => void;
    resetGame: () => void;
    setGameMode: (mode: GameMode) => void;
    setPlayerName: (player: Player, name: string) => void;
    setFirstLaunch: (value: boolean) => void;
    setHasGameStarted: (value: boolean) => void;
    updateTimer: (player: Player) => void;
    resetTimer: () => void;
  }
>()(
  persist(
    (set, get) => ({
      ...initialState,

      setGameMode: (mode) => set({ gameMode: mode }),

      setPlayerName: (player, name) =>
        set((state) => ({
          players: {
            ...state.players,
            [player]: name,
          },
        })),

      setFirstLaunch: (value) => set({ isFirstLaunch: value }),

      setHasGameStarted: (value) => set({ hasGameStarted: value }),

      updateTimer: (player) =>
        set((state) => ({
          timer: {
            ...state.timer,
            [player]: state.timer[player] + 1,
          },
        })),

      resetTimer: () =>
        set({
          timer: {
            X: 0,
            O: 0,
          },
        }),

      makeMove: (position: number) => {
        const state = get();
        if (state.board[position] || state.winner || !state.hasGameStarted) {
          return;
        }

        const newBoard = [...state.board];
        newBoard[position] = state.currentPlayer;

        const newMove = {
          player: state.currentPlayer,
          position,
          timestamp: Date.now(),
        };

        set({
          board: newBoard,
          currentPlayer: state.currentPlayer === "X" ? "O" : "X",
          moves: [...state.moves, newMove],
          winner: calculateWinner(newBoard),
        });

        // Handle computer move if needed
        if (
          state.gameMode === "vsComputer" &&
          !calculateWinner(newBoard) &&
          state.currentPlayer === "X"
        ) {
          setTimeout(() => {
            const computerPosition = computerMove(newBoard);
            get().makeMove(computerPosition);
          }, 500);
        }
      },

      undoMove: () => {
        const state = get();
        if (state.moves.length === 0) return;

        const newMoves = [...state.moves];
        newMoves.pop();

        const newBoard = Array(9).fill(null);
        newMoves.forEach((move) => {
          newBoard[move.position] = move.player;
        });

        set({
          board: newBoard,
          moves: newMoves,
          currentPlayer: newMoves.length % 2 === 0 ? "X" : "O",
          winner: calculateWinner(newBoard),
        });
      },

      resetGame: () =>
        set({
          board: Array(9).fill(null),
          currentPlayer: "X",
          winner: null,
          moves: [],
          hasGameStarted: true,
          timer: {
            X: 0,
            O: 0,
          },
        }),
    }),
    {
      name: "tic-tac-toe-storage",
    }
  )
);
