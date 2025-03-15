import { create } from "zustand";
import { Theme } from "@tictactoe/types";
import { defaultTheme, applyTheme } from "@tictactoe/utils";

interface ThemeStore {
  isDarkMode: boolean;
  theme: Theme;
  toggleDarkMode: () => void;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  isDarkMode: false,
  theme: defaultTheme,

  toggleDarkMode: () => {
    set((state) => ({ isDarkMode: !state.isDarkMode }));
    document.documentElement.classList.toggle("dark");
  },

  setTheme: (theme: Theme) => {
    set({ theme });
    applyTheme(theme);
  },
}));
