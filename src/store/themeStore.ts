import { create } from "zustand";
import { Theme } from "../types";

type ThemeStore = {
  isDarkMode: boolean;
  theme: Theme;
  toggleDarkMode: () => void;
  setTheme: (theme: Theme) => void;
};

const generateNudeColors = (primary: string): Theme => {
  // This is a simplified version. In a real app, you'd want to use a color manipulation library
  return {
    primary,
    secondary: primary + "99", // Adding transparency
    accent: primary + "cc",
    neutral: primary + "33",
    background: primary + "11",
  };
};

const defaultTheme: Theme = {
  primary: "#a8947d",
  secondary: "#baa898",
  accent: "#8c7a66",
  neutral: "#d1c7bc",
  background: "#f5f2ef",
};

export const useThemeStore = create<ThemeStore>((set) => ({
  isDarkMode: false,
  theme: defaultTheme,

  toggleDarkMode: () => {
    set((state) => ({ isDarkMode: !state.isDarkMode }));
    document.documentElement.classList.toggle("dark");
  },

  setTheme: (theme: Theme) => {
    set({ theme });
    // Apply theme to CSS variables
    Object.entries(theme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--color-${key}`, value);
    });
  },
}));
