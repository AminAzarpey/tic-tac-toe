import { motion } from "framer-motion";
import { useThemeStore } from "@tictactoe/store";
import { Theme } from "@tictactoe/types";
import { baseColors } from "@tictactoe/utils";

const ThemeControls = () => {
  const { isDarkMode, toggleDarkMode, setTheme } = useThemeStore();

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    const theme: Theme = {
      primary: color,
      secondary: `${color}99`,
      accent: `${color}cc`,
      neutral: `${color}33`,
      background: `${color}11`,
    };
    setTheme(theme);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-4 p-4 bg-background rounded-lg shadow-lg"
    >
      <button
        onClick={toggleDarkMode}
        className="p-2 rounded-lg bg-neutral hover:bg-neutral/80 transition-colors duration-300"
      >
        {isDarkMode ? "🌞" : "🌙"}
      </button>

      <input
        type="color"
        onChange={handleColorChange}
        className="w-10 h-10 rounded cursor-pointer"
      />
    </motion.div>
  );
};

export default ThemeControls;
