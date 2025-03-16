import { create } from "zustand";
import { persist } from "zustand/middleware";

type Language = "en" | "fa";

type TranslationKeys = keyof typeof translations.en;

type TranslationStore = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKeys) => string;
};

const translations = {
  en: {
    title: "Tic Tac Toe",
    welcomeToGame: "Welcome to Tic Tac Toe!",
    selectGameMode: "Select Game Mode",
    player1Name: "Player 1 Name",
    player2Name: "Player 2 Name",
    startGame: "Start Game",
    gameMode: "Game Mode",
    oneVsOne: "1 vs 1",
    vsComputer: "vs Computer",
    colorPalette: "Color Palette",
    language: "Language",
    english: "English",
    persian: "Persian",
    settings: "Settings",
    dark: "Dark Mode",
    light: "Light Mode",
    gameHistory: "Game History",
    noMoves: "No moves yet",
    move: "Move",
    placedAt: "placed at position",
    undo: "Undo",
    reset: "Reset",
    wins: "wins!",
    draw: "It's a draw!",
    turn: "'s turn",
    playerXName: "Player X Name",
    playerOName: "Player O Name",
    cannotChangeGameMode: "Cannot change game mode during a game",
  },
  fa: {
    title: "دوز",
    welcomeToGame: "به بازی دوز خوش آمدید!",
    selectGameMode: "حالت بازی را انتخاب کنید",
    player1Name: "نام بازیکن اول",
    player2Name: "نام بازیکن دوم",
    startGame: "شروع بازی",
    gameMode: "حالت بازی",
    oneVsOne: "۱ در مقابل ۱",
    vsComputer: "در مقابل کامپیوتر",
    colorPalette: "پالت رنگ",
    language: "زبان",
    english: "انگلیسی",
    persian: "فارسی",
    settings: "تنظیمات",
    dark: "حالت تاریک",
    light: "حالت روشن",
    gameHistory: "تاریخچه بازی",
    noMoves: "هنوز حرکتی انجام نشده",
    move: "حرکت",
    placedAt: "در موقعیت",
    undo: "برگشت",
    reset: "شروع مجدد",
    wins: "برنده شد!",
    draw: "مساوی شد!",
    turn: "نوبت",
    playerXName: "نام بازیکن X",
    playerOName: "نام بازیکن O",
    cannotChangeGameMode: "در حین بازی نمی‌توان حالت بازی را تغییر داد",
  },
} as const;

export const useTranslation = create<TranslationStore>()(
  persist(
    (set, get) => ({
      language: "en",
      setLanguage: (lang) => set({ language: lang }),
      t: (key) => translations[get().language][key] || key,
    }),
    {
      name: "language-storage",
    }
  )
);
