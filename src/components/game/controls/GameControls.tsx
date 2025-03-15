import { motion } from "framer-motion";
import { useGameStore } from "@tictactoe/store";
import { GameMode, Player } from "@tictactoe/types";
import { useTranslation } from "@tictactoe/hooks";

const GameControls = () => {
  const {
    resetGame,
    setGameMode,
    gameMode,
    setPlayers,
    players,
    undoMove,
    moves,
  } = useGameStore();
  const { t } = useTranslation();

  const handleNameChange = (player: Player, name: string) => {
    setPlayers({
      ...players,
      [player]: name,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-4 p-4 bg-background rounded-lg shadow-lg"
    >
      <div className="flex gap-4 justify-between">
        <div className="flex gap-4">
          <button
            onClick={() => setGameMode("1v1")}
            className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
              gameMode === "1v1"
                ? "bg-primary text-white"
                : "bg-neutral hover:bg-neutral/80"
            }`}
          >
            {t("oneVsOne")}
          </button>
          <button
            onClick={() => setGameMode("vsComputer")}
            className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
              gameMode === "vsComputer"
                ? "bg-primary text-white"
                : "bg-neutral hover:bg-neutral/80"
            }`}
          >
            {t("vsComputer")}
          </button>
        </div>
        <div className="flex gap-4">
          <button
            onClick={resetGame}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors duration-300"
          >
            {t("reset")}
          </button>
          <button
            onClick={undoMove}
            disabled={moves.length === 0}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t("undo")}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <input
          type="text"
          value={players.X}
          onChange={(e) => handleNameChange("X", e.target.value)}
          placeholder={t("playerXName")}
          className="px-4 py-2 rounded-lg bg-neutral/50 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {gameMode === "1v1" && (
          <input
            type="text"
            value={players.O}
            onChange={(e) => handleNameChange("O", e.target.value)}
            placeholder={t("playerOName")}
            className="px-4 py-2 rounded-lg bg-neutral/50 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        )}
      </div>
    </motion.div>
  );
};

export default GameControls;
