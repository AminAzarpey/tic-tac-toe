import { useTranslation } from "@tictactoe/hooks";
import { useGameStore } from "@tictactoe/store";
import { Board, GameTimer } from "@tictactoe/components";

export const GameBoard = () => {
  const { board, makeMove, resetGame, hasGameStarted } = useGameStore();
  const { t } = useTranslation();

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-md">
        {hasGameStarted && <GameTimer />}
        <Board board={board} onSquareClick={makeMove} />
        <div className="mt-4 flex justify-center">
          <button
            onClick={resetGame}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            {t("reset")}
          </button>
        </div>
      </div>
    </div>
  );
};
