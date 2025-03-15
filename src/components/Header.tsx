import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "../hooks/useTranslation";
import { useTheme } from "../hooks/useTheme";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FiSun, FiMoon } from "react-icons/fi";
import { useGameStore } from "../store/gameStore";

const baseColors = {
  blue: "#3B82F6",
  green: "#10B981",
  orange: "#F59E0B",
  red: "#EF4444",
  purple: "#8B5CF6",
};

const generateColorPalette = (primaryColor: string) => {
  // Convert hex to HSL
  const hexToHSL = (hex: string) => {
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    let l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return [h * 360, s * 100, l * 100];
  };

  // Convert HSL to hex
  const hslToHex = (h: number, s: number, l: number) => {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, "0");
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  const [h, s, l] = hexToHSL(primaryColor);

  return {
    primary: primaryColor,
    secondary: hslToHex(h, s, l - 20),
    accent: hslToHex((h + 30) % 360, s, l),
    neutral: hslToHex(h, s - 30, l - 10),
  };
};

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, language, setLanguage } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const {
    gameMode,
    setGameMode,
    winner,
    setFirstLaunch,
    setHasGameStarted,
    hasGameStarted,
  } = useGameStore();

  const handleGameModeChange = (mode: GameMode) => {
    setGameMode(mode);
    setFirstLaunch(true);
    setHasGameStarted(false);
  };

  const handleColorChange = (color: string) => {
    const palette = generateColorPalette(color);
    Object.entries(palette).forEach(([type, value]) => {
      document.documentElement.style.setProperty(`--color-${type}`, value);
      // Apply color to CSS variables
      document.documentElement.style.setProperty(
        `--color-${type}-rgb`,
        value
          .replace("#", "")
          .match(/.{2}/g)
          ?.map((x) => parseInt(x, 16))
          .join(", ") || ""
      );
    });
  };

  return (
    <header
      className="w-full p-4 flex justify-between items-center shadow-md"
      style={{ backgroundColor: `rgba(var(--color-primary-rgb), 0.1)` }}
      dir={language === "fa" ? "rtl" : "ltr"}
    >
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          {t("welcomeToGame")}
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label={theme === "light" ? t("dark") : t("light")}
        >
          {theme === "light" ? (
            <FiMoon className="w-6 h-6 text-gray-800 dark:text-white" />
          ) : (
            <FiSun className="w-6 h-6 text-gray-800 dark:text-white" />
          )}
        </button>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label={t("settings")}
        >
          {isMenuOpen ? (
            <HiX className="w-6 h-6 text-gray-800 dark:text-white" />
          ) : (
            <HiMenuAlt3 className="w-6 h-6 text-gray-800 dark:text-white" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 right-4 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 z-50"
            dir={language === "fa" ? "rtl" : "ltr"}
          >
            <div className="space-y-4">
              {/* Game Mode */}
              <div className="space-y-2">
                <span className="text-gray-600 dark:text-gray-300">
                  {t("gameMode")}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleGameModeChange("1v1")}
                    className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                      gameMode === "1v1"
                        ? "bg-primary text-white"
                        : "bg-gray-100 dark:bg-gray-700"
                    }`}
                  >
                    {t("1v1")}
                  </button>
                  <button
                    onClick={() => handleGameModeChange("vsComputer")}
                    className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                      gameMode === "vsComputer"
                        ? "bg-primary text-white"
                        : "bg-gray-100 dark:bg-gray-700"
                    }`}
                  >
                    {t("vsComputer")}
                  </button>
                </div>
                {/* {hasGameStarted && (
                  <p className="text-sm text-gray-500">
                    {t("cannotChangeGameMode")}
                  </p>
                )} */}
              </div>

              {/* Color Palette */}
              <div className="space-y-2">
                <span className="text-gray-600 dark:text-gray-300">
                  {t("colorPalette")}
                </span>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(baseColors).map(([name, color]) => (
                    <button
                      key={name}
                      onClick={() => handleColorChange(color)}
                      className="w-10 h-10 rounded-full transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                      style={{ backgroundColor: color }}
                      title={name}
                    />
                  ))}
                </div>
              </div>

              {/* Language */}
              <div className="space-y-2">
                <span className="text-gray-600 dark:text-gray-300">
                  {t("language")}
                </span>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as "en" | "fa")}
                  className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                >
                  <option value="en">{t("english")}</option>
                  <option value="fa">{t("persian")}</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
