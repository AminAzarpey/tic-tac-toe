import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "../store/gameStore";
import { useTranslation } from "../hooks/useTranslation";
import { HiX } from "react-icons/hi";

const InitialGameModal = () => {
  const {
    setGameMode,
    setPlayerName,
    gameMode,
    players,
    isFirstLaunch,
    setFirstLaunch,
    setHasGameStarted,
  } = useGameStore();
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFirstLaunch(false);
    setHasGameStarted(true);
  };

  return (
    <AnimatePresence>
      {isFirstLaunch && (
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
            className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl max-w-md w-full mx-4"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                {t("welcomeToGame")}
              </h2>
              <button
                onClick={() => setFirstLaunch(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <HiX className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <label className="block text-gray-700 dark:text-gray-300 text-lg">
                  {t("selectGameMode")}
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setGameMode("1v1")}
                    className={`flex-1 py-3 px-4 rounded-lg text-lg font-medium transition-colors ${
                      gameMode === "1v1"
                        ? "bg-primary text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    {t("1v1")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setGameMode("vsComputer")}
                    className={`flex-1 py-3 px-4 rounded-lg text-lg font-medium transition-colors ${
                      gameMode === "vsComputer"
                        ? "bg-primary text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    {t("vsComputer")}
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 text-lg mb-2">
                    {t("player1Name")}
                  </label>
                  <input
                    type="text"
                    value={players.X}
                    onChange={(e) => setPlayerName("X", e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white border-2 border-transparent focus:border-primary focus:outline-none text-lg"
                    required
                  />
                </div>

                {gameMode === "1v1" && (
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 text-lg mb-2">
                      {t("player2Name")}
                    </label>
                    <input
                      type="text"
                      value={players.O}
                      onChange={(e) => setPlayerName("O", e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white border-2 border-transparent focus:border-primary focus:outline-none text-lg"
                      required
                    />
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-primary text-white rounded-lg text-lg font-semibold hover:bg-primary/80 transition-colors"
              >
                {t("startGame")}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InitialGameModal;
