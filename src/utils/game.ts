import { Board, Player, Position } from "@tictactoe/types";

export const calculateWinner = (board: Board): Player | "draw" | null => {
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

export const computerMove = (board: Board): Position => {
  const availablePositions = board
    .map((cell, index) => (cell === null ? index : -1))
    .filter((pos) => pos !== -1);

  const position =
    availablePositions[Math.floor(Math.random() * availablePositions.length)];

  return {
    row: Math.floor(position / 3),
    col: position % 3,
  };
};

export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};
