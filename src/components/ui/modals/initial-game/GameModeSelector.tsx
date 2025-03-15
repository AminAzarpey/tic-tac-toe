import { GameMode } from "@tictactoe/types";
import { useTranslation } from "@tictactoe/hooks";

interface GameModeSelectorProps {
  gameMode: GameMode;
  onGameModeChange: (mode: GameMode) => void;
}

const GameModeSelector = ({
  gameMode,
  onGameModeChange,
}: GameModeSelectorProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <label className="block text-gray-700 dark:text-gray-300 text-lg">
        {t("selectGameMode")}
      </label>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => onGameModeChange("1v1")}
          className={`flex-1 py-3 px-4 rounded-lg text-lg font-medium transition-colors ${
            gameMode === "1v1"
              ? "bg-primary text-white"
              : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
          }`}
        >
          {t("oneVsOne")}
        </button>
        <button
          type="button"
          onClick={() => onGameModeChange("vsComputer")}
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
  );
};

export default GameModeSelector;
