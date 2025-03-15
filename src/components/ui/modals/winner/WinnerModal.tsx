import { motion } from "framer-motion";
import { useTranslation } from "@tictactoe/hooks";
import { Player } from "@tictactoe/types";
import { useEffect } from "react";
import { playWinAnimation, modalAnimations } from "@tictactoe/utils";

interface WinnerModalProps {
  winner: Player | "draw" | null;
  playerName: string;
  onPlayAgain: () => void;
}

const WinnerModal = ({
  winner,
  playerName,
  onPlayAgain,
}: WinnerModalProps) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (winner && winner !== "draw") {
      playWinAnimation();
    }
  }, [winner]);

  if (!winner) return null;

  return (
    <motion.div
      {...modalAnimations.overlay}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <motion.div
        {...modalAnimations.content}
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

export default WinnerModal;
