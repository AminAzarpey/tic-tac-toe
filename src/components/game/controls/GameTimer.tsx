import { useEffect, useState } from "react";
import { useGameStore } from "@tictactoe/store";
import { motion } from "framer-motion";

const GameTimer = () => {
  const { currentPlayer, winner, players } = useGameStore();
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (winner) return;

    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [winner]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center gap-4 mb-4">
      <div className="flex rounded-lg bg-neutral/20 p-1">
        <div
          className={`relative flex items-center gap-2 px-6 py-2 rounded-md transition-colors duration-300 ${
            currentPlayer === "X"
              ? "bg-background text-primary"
              : "text-neutral hover:text-primary"
          }`}
        >
          <span className="text-lg font-semibold">
            <span className="text-primary">{players.X}</span>
          </span>
          <div className="text-lg font-bold">{formatTime(seconds)}</div>
          {currentPlayer === "X" && !winner && (
            <motion.div
              layoutId="activePlayer"
              className="absolute inset-0 bg-primary/10 rounded-md -z-10"
            />
          )}
        </div>
        <div
          className={`relative flex items-center gap-2 px-6 py-2 rounded-md transition-colors duration-300 ${
            currentPlayer === "O"
              ? "bg-background text-secondary"
              : "text-neutral hover:text-secondary"
          }`}
        >
          <span className="text-lg font-semibold">
            <span className="text-secondary">{players.O}</span>
          </span>
          <div className="text-lg font-bold text-secondary">
            {formatTime(seconds)}
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
