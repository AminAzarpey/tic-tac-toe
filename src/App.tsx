import { useEffect } from "react";
import { useThemeStore } from "@tictactoe/store";
import { useTranslation } from "@tictactoe/hooks";
import {
  GameBoard,
  GameHistory,
  GameStatus,
  Layout,
  GameModals,
} from "@tictactoe/components";

const App = () => {
  const { isDarkMode } = useThemeStore();
  const { language } = useTranslation();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  useEffect(() => {
    document.documentElement.dir = language === "fa" ? "rtl" : "ltr";
  }, [language]);

  return (
    <Layout>
      {/* Game Status */}
      <div className="text-center mb-8">
        <GameStatus />
      </div>

      {/* Game Board and History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className={language === "fa" ? "order-2" : ""}>
          <GameBoard />
        </div>
        <div
          className={`w-full max-w-md mx-auto ${
            language === "fa" ? "order-1" : ""
          }`}
        >
          <GameHistory />
        </div>
      </div>

      {/* Modals */}
      <GameModals />
    </Layout>
  );
};

export default App;
