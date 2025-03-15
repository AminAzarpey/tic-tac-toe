import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "../store/gameStore";

const GameStatus = () => {
  const { winner, currentPlayer, players } = useGameStore();

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
            <span>Game is a Draw!</span>
          ) : (
            <span>{players[winner]} Wins! 🎉</span>
          )
        ) : (
          <span>{players[currentPlayer]}'s Turn</span>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default GameStatus;
