import { useEffect } from "react";
import { useGameStore } from "@tictactoe/store";
import { useTranslation } from "@tictactoe/hooks";
import { motion } from "framer-motion";
import { formatTime } from "@tictactoe/utils";

const GameTimer = () => {
  const { currentPlayer, winner, timer, updateTimer, hasGameStarted, players } =
    useGameStore();
  const { t } = useTranslation();

  useEffect(() => {
    if (!winner && hasGameStarted) {
      const interval = setInterval(() => {
        updateTimer(currentPlayer);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [currentPlayer, winner, hasGameStarted, updateTimer]);

  return (
    <div className="flex flex-col items-center gap-4 mb-4">
      <div className="flex rounded-lg bg-neutral/20 p-1">
        <div
          className={`relative flex items-center gap-2 px-6 py-2 rounded-md transition-colors duration-300 ${
            currentPlayer === "X" && !winner
              ? "bg-background text-primary"
              : "text-neutral hover:text-primary"
          }`}
        >
          <span className="text-lg font-semibold">
            <span className="text-primary">{players.X}</span>
          </span>
          <div className="text-lg font-bold">{formatTime(timer.X)}</div>
          {currentPlayer === "X" && !winner && (
            <motion.div
              layoutId="activePlayer"
              className="absolute inset-0 bg-primary/10 rounded-md -z-10"
            />
          )}
        </div>
        <div
          className={`relative flex items-center gap-2 px-6 py-2 rounded-md transition-colors duration-300 ${
            currentPlayer === "O" && !winner
              ? "bg-background text-secondary"
              : " hover:text-secondary"
          }`}
        >
          <span className="text-lg font-semibold">
            <span className="text-secondary">{players.O}</span>
          </span>
          <div className="text-lg font-bold text-secondary">
            {formatTime(timer.O)}
          </div>
          {currentPlayer === "O" && !winner && (
            <motion.div
              layoutId="activePlayer"
              className="absolute inset-0 bg-secondary/10 rounded-md -z-10"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default GameTimer;
