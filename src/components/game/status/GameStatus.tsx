import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@tictactoe/store";
import { useTranslation } from "@tictactoe/hooks";

const GameStatus = () => {
  const { winner, currentPlayer, players } = useGameStore();
  const { t, language } = useTranslation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={winner || currentPlayer}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="text-2xl font-bold text-center text-primary p-4"
      >
        {winner ? (
          winner === "draw" ? (
            <span>{t("draw")}</span>
          ) : (
            <span>
              {language === "fa"
                ? `${t("wins")} ${players[winner]}`
                : `${players[winner]} ${t("wins")}`}{" "}
              🎉
            </span>
          )
        ) : (
          <span>
            {language === "fa"
              ? `${t("turn")} ${players[currentPlayer]}`
              : `${players[currentPlayer]} ${t("turn")}`}
          </span>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default GameStatus;
