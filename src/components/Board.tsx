import { Player } from "../types";

interface BoardProps {
  board: (Player | null)[];
  onSquareClick: (index: number) => void;
}

export const Board = ({ board, onSquareClick }: BoardProps) => {
  return (
    <div className="board">
      {board.map((square, i) => (
        <button
          key={i}
          onClick={() => onSquareClick(i)}
          className={`cell ${square?.toLowerCase() || ""}`}
          disabled={square !== null}
        >
          {square}
        </button>
      ))}
    </div>
  );
};
