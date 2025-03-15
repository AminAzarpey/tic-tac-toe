import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "../hooks/useTranslation";
import { useGameStore } from "../store/gameStore";
import { Move } from "../types";

interface GameHistoryProps {
  moves: Move[];
  onUndoMove: () => void;
}

export const GameHistory = ({ moves, onUndoMove }: GameHistoryProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useTranslation();
  const { players } = useGameStore();

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          {t("gameHistory")}
        </h2>
        {moves.length > 0 && (
          <button
            onClick={onUndoMove}
            className="btn-secondary px-3 py-1 rounded-lg text-sm"
          >
            {t("undo")}
          </button>
        )}
      </div>

      <div className="space-y-2 max-h-[300px] overflow-y-auto">
        {moves.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center">
            {t("noMoves")}
          </p>
        ) : (
          moves.map((move, index) => (
            <div key={move.timestamp} className="history-item">
              <span className="font-medium">
                {t("move")} {index + 1}:
              </span>{" "}
              <span
                className={`font-bold ${
                  move.player === "X" ? "text-[#1e40af]" : "text-[#fcd34d]"
                }`}
              >
                {move.player}
              </span>{" "}
              {t("placedAt")} {move.position + 1}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
