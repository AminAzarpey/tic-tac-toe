import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@tictactoe/store";
import { useTranslation } from "@tictactoe/hooks";
import { HiX } from "react-icons/hi";
import { modalAnimations } from "@tictactoe/utils";
import { GameModeSelector, PlayerNameInput } from "@tictactoe/components";

const InitialGameModal = () => {
  const {
    setGameMode,
    setPlayers,
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

  const handlePlayerNameChange = (player: "X" | "O", name: string) => {
    setPlayers({
      ...players,
      [player]: name,
    });
  };

  if (!isFirstLaunch) return null;

  return (
    <AnimatePresence>
      <motion.div
        {...modalAnimations.overlay}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      >
        <motion.div
          {...modalAnimations.content}
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
            <GameModeSelector
              gameMode={gameMode}
              onGameModeChange={setGameMode}
            />

            <div className="space-y-4">
              <PlayerNameInput
                player="X"
                value={players.X}
                onChange={(value) => handlePlayerNameChange("X", value)}
                label={t("player1Name")}
              />

              {gameMode === "1v1" && (
                <PlayerNameInput
                  player="O"
                  value={players.O}
                  onChange={(value) => handlePlayerNameChange("O", value)}
                  label={t("player2Name")}
                />
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
    </AnimatePresence>
  );
};

export default InitialGameModal;
