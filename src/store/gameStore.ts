import { create } from "zustand";
import { persist } from "zustand/middleware";
import { GameState, Player, GameMode, Move, Board } from "@tictactoe/types";
import { calculateWinner, computerMove } from "@tictactoe/utils";

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

type GameStore = GameState & {
  setGameMode: (mode: GameMode) => void;
  setPlayers: (players: { X: string; O: string }) => void;
  makeMove: (position: number) => void;
  undoMove: () => void;
  resetGame: () => void;
  setFirstLaunch: (value: boolean) => void;
  setHasGameStarted: (value: boolean) => void;
  updateTimer: (player: Player) => void;
};

const handleComputerMove = (
  board: Board,
  makeMove: (position: number) => void
) => {
  const position = computerMove(board);
  const index = position.row * 3 + position.col;
  makeMove(index);
};

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setGameMode: (mode: GameMode) =>
        set({ gameMode: mode, winner: null, board: Array(9).fill(null) }),

      setPlayers: (players: { X: string; O: string }) => set({ players }),

      makeMove: (position: number) => {
        const state = get();
        if (state.board[position] || state.winner || !state.hasGameStarted) {
          return;
        }

        const newBoard = [...state.board];
        newBoard[position] = state.currentPlayer;

        const newMove: Move = {
          player: state.currentPlayer,
          position: {
            row: Math.floor(position / 3),
            col: position % 3,
          },
          timestamp: Date.now(),
          board: [...newBoard],
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
            handleComputerMove(newBoard, get().makeMove);
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
          newBoard[move.position.row * 3 + move.position.col] = move.player;
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

      setFirstLaunch: (value: boolean) => set({ isFirstLaunch: value }),

      setHasGameStarted: (value: boolean) => set({ hasGameStarted: value }),

      updateTimer: (player: Player) =>
        set((state) => ({
          timer: {
            ...state.timer,
            [player]: state.timer[player] + 1,
          },
        })),
    }),
    {
      name: "tic-tac-toe-storage",
    }
  )
);
