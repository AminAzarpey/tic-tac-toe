import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "../hooks/useTranslation";
import confetti from "canvas-confetti";
import { useEffect } from "react";
import { Player } from "../types";

interface WinnerModalProps {
  winner: Player | "draw" | null;
  playerName: string;
  onPlayAgain: () => void;
}

export const WinnerModal = ({
  winner,
  playerName,
  onPlayAgain,
}: WinnerModalProps) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (winner && winner !== "draw") {
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#3B82F6", "#10B981", "#F59E0B"],
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#3B82F6", "#10B981", "#F59E0B"],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();
    }
  }, [winner]);

  if (!winner) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl max-w-md w-full mx-4 text-center"
      >
        {winner === "draw" ? (
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
            {t("draw")}
          </h2>
        ) : (
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
            🎉 {playerName} {t("wins")} 🎉
          </h2>
        )}
        <button
          onClick={onPlayAgain}
          className="px-6 py-3 bg-primary text-white rounded-lg text-lg font-semibold hover:bg-primary/80 transition-colors"
        >
          {t("reset")}
        </button>
      </motion.div>
    </motion.div>
  );
};
