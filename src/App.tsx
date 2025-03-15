import { useEffect } from "react";
import { Header } from "./components/Header";
import { Board } from "./components/Board";
import { GameHistory } from "./components/GameHistory";
import { WinnerModal } from "./components/WinnerModal";
import { GameTimer } from "./components/GameTimer";
import InitialGameModal from "./components/InitialGameModal";
import { useGameStore } from "./store/gameStore";
import { useTranslation } from "./hooks/useTranslation";
import { useTheme } from "./hooks/useTheme";

const App = () => {
  const {
    board,
    currentPlayer,
    winner,
    moves,
    players,
    isFirstLaunch,
    makeMove,
    undoMove,
    resetGame,
    hasGameStarted,
  } = useGameStore();

  const { t } = useTranslation();
  const { theme } = useTheme();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Game Status */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">
              {winner ? null : (
                <div
                  className={`inline-block px-4 py-1 rounded-lg transition-colors ${
                    currentPlayer === "X"
                      ? "bg-[#1e40af]/10 text-[#1e40af]"
                      : "bg-[#fcd34d]/10 text-[#fcd34d]"
                  }`}
                >
                  {`${currentPlayer === "X" ? players.X : players.O}${t(
                    "turn"
                  )}`}
                </div>
              )}
            </h2>
          </div>

          {/* Game Board and History */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex justify-center">
              <div className="w-full max-w-md">
                {hasGameStarted && <GameTimer />}
                <Board board={board} onSquareClick={makeMove} />
                <div className="mt-4 flex justify-center">
                  <button
                    onClick={resetGame}
                    className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    {t("reset")}
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full max-w-md mx-auto">
              <GameHistory moves={moves} onUndoMove={undoMove} />
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      {isFirstLaunch && !hasGameStarted && <InitialGameModal />}
      <WinnerModal
        winner={winner}
        playerName={winner === "X" ? players.X : players.O}
        onPlayAgain={resetGame}
      />
    </div>
  );
};

export default App;
