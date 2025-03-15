import { create } from "zustand";

type Language = "en" | "fa";

interface TranslationState {
  language: Language;
  setLanguage: (language: Language) => void;
}

const translations = {
  en: {
    welcomeToGame: "Welcome to Tic Tac Toe!",
    selectGameMode: "Select Game Mode",
    "1v1": "1 vs 1",
    vsComputer: "vs Computer",
    player1Name: "Player 1 Name",
    player2Name: "Player 2 Name",
    startGame: "Start Game",
    gameHistory: "Game History",
    move: "Move",
    placedAt: "placed at position",
    undo: "Undo",
    noMoves: "No moves yet",
    collapse: "Collapse",
    expand: "Expand",
    turn: "'s turn",
    wins: "wins!",
    draw: "It's a draw!",
    reset: "Reset Game",
    settings: "Settings",
    language: "Language",
    english: "English",
    persian: "Persian",
    theme: "Theme",
    light: "Light",
    dark: "Dark",
    gameMode: "Game Mode",
    colorPalette: "Color Palette",
    primary: "Primary Color",
    secondary: "Secondary Color",
    accent: "Accent Color",
    neutral: "Neutral Color",
    cannotChangeGameMode: "Cannot change game mode while game is in progress",
  },
  fa: {
    welcomeToGame: "به بازی ایکس او خوش آمدید!",
    selectGameMode: "انتخاب حالت بازی",
    "1v1": "۱ در مقابل ۱",
    vsComputer: "در مقابل کامپیوتر",
    player1Name: "نام بازیکن ۱",
    player2Name: "نام بازیکن ۲",
    startGame: "شروع بازی",
    gameHistory: "تاریخچه بازی",
    move: "حرکت",
    placedAt: "در موقعیت",
    undo: "برگشت",
    noMoves: "هنوز حرکتی انجام نشده",
    collapse: "بستن",
    expand: "نمایش کامل",
    turn: " نوبت",
    wins: "برنده شد!",
    draw: "بازی مساوی شد!",
    reset: "شروع مجدد",
    settings: "تنظیمات",
    language: "زبان",
    english: "انگلیسی",
    persian: "فارسی",
    theme: "تم",
    light: "روشن",
    dark: "تاریک",
    gameMode: "حالت بازی",
    colorPalette: "پالت رنگ",
    primary: "رنگ اصلی",
    secondary: "رنگ ثانویه",
    accent: "رنگ تاکیدی",
    neutral: "رنگ خنثی",
    cannotChangeGameMode: "در حین بازی نمی‌توان حالت بازی را تغییر داد",
  },
};

export const useTranslationStore = create<TranslationState>((set) => ({
  language: "en",
  setLanguage: (language) => set({ language }),
}));

export const useTranslation = () => {
  const { language, setLanguage } = useTranslationStore();

  const t = (key: keyof typeof translations.en) => {
    return translations[language][key];
  };

  return { t, language, setLanguage };
};
