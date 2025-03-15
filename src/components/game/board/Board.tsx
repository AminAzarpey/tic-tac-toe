import { Board as BoardType, Cell } from "@tictactoe/types";

interface BoardProps {
  board: BoardType;
  onSquareClick: (index: number) => void;
}

const Board = ({ board, onSquareClick }: BoardProps) => {
  const getPlayerClass = (square: Cell) => {
    if (!square) return "";
    return square === "X" ? "text-primary" : "text-secondary";
  };

  return (
    <div className="board ltr">
      {board.map((square, i) => (
        <button
          key={i}
          onClick={() => onSquareClick(i)}
          className={`cell ${getPlayerClass(square)}`}
          disabled={square !== null}
        >
          {square}
        </button>
      ))}
    </div>
  );
};

export default Board;
