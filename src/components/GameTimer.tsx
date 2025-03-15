import { useEffect } from "react";
import { useGameStore } from "../store/gameStore";
import { useTranslation } from "../hooks/useTranslation";
import { motion } from "framer-motion";

export const GameTimer = () => {
  const { currentPlayer, winner, timer, updateTimer, hasGameStarted } =
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

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex justify-around p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md mb-4 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 w-1/2"
        style={{
          backgroundColor:
            currentPlayer === "X"
              ? "rgba(30, 64, 175, 0.05)"
              : "rgba(252, 211, 77, 0.05)",
        }}
        animate={{
          x: currentPlayer === "X" ? "0%" : "100%",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
      <div
        className={`text-center relative z-10 transition-colors duration-300`}
      >
        <div
          className={`text-lg font-bold mb-1 ${
            currentPlayer === "X" ? "text-[#1e40af]" : "text-gray-500"
          }`}
        >
          X
        </div>
        <div
          className={`text-2xl font-mono ${
            currentPlayer === "X" ? "text-[#1e40af] font-bold" : "text-gray-600"
          }`}
        >
          {formatTime(timer.X)}
        </div>
      </div>
      <div
        className={`text-center relative z-10 transition-colors duration-300`}
      >
        <div
          className={`text-lg font-bold mb-1 ${
            currentPlayer === "O" ? "text-[#fcd34d]" : "text-gray-500"
          }`}
        >
          O
        </div>
        <div
          className={`text-2xl font-mono ${
            currentPlayer === "O" ? "text-[#fcd34d] font-bold" : "text-gray-600"
          }`}
        >
          {formatTime(timer.O)}
        </div>
      </div>
    </div>
  );
};
