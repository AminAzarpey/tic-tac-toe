import { motion } from "framer-motion";
import { useGameStore } from "../store/gameStore";
import { GameMode, Player } from "../types";

const GameControls = () => {
  const {
    resetGame,
    setGameMode,
    gameMode,
    setPlayerName,
    players,
    undoMove,
    history,
  } = useGameStore();

  const handleNameChange = (player: Player, name: string) => {
    setPlayerName(player, name);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-4 p-4 bg-background rounded-lg shadow-lg"
    >
      <div className="flex gap-4">
        <button
          onClick={() => setGameMode("1v1")}
          className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
            gameMode === "1v1"
              ? "bg-primary text-white"
              : "bg-neutral hover:bg-neutral/80"
          }`}
        >
          1 vs 1
        </button>
        <button
          onClick={() => setGameMode("vsComputer")}
          className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
            gameMode === "vsComputer"
              ? "bg-primary text-white"
              : "bg-neutral hover:bg-neutral/80"
          }`}
        >
          vs Computer
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <input
          type="text"
          value={players.X}
          onChange={(e) => handleNameChange("X", e.target.value)}
          placeholder="Player X Name"
          className="px-4 py-2 rounded-lg bg-neutral/50 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {gameMode === "1v1" && (
          <input
            type="text"
            value={players.O}
            onChange={(e) => handleNameChange("O", e.target.value)}
            placeholder="Player O Name"
            className="px-4 py-2 rounded-lg bg-neutral/50 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        )}
      </div>

      <div className="flex gap-4">
        <button
          onClick={resetGame}
          className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/80 transition-colors duration-300"
        >
          Reset Game
        </button>
        <button
          onClick={undoMove}
          disabled={history.length === 0}
          className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/80 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Undo Move
        </button>
      </div>
    </motion.div>
  );
};

export default GameControls;
