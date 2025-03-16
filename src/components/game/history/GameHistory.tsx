import { useGameStore } from "@tictactoe/store";
import { useTranslation } from "@tictactoe/hooks";

const GameHistory = () => {
  const { moves, undoMove } = useGameStore();
  const { t } = useTranslation();

  if (moves.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">{t("gameHistory")}</h3>
        <button
          onClick={undoMove}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors duration-300"
        >
          {t("undo")}
        </button>
      </div>
      {[...moves].reverse().map((move, index) => (
        <div key={index} className="history-item">
          <span>
            {t("move")}{" "}
            <span
              className={`font-bold ${
                move.player === "X" ? "text-primary" : "text-secondary"
              }`}
            >
              {move.player}
            </span>{" "}
            {t("placedAt")}{" "}
            <span className="ltr inline-block">
              ({move.position.row + 1}, {move.position.col + 1})
            </span>
          </span>
        </div>
      ))}
    </div>
  );
};

export default GameHistory;
