import { Theme } from "@tictactoe/types";
import { generateColorPalette } from "./colors";

export const applyTheme = (theme: Theme) => {
  Object.entries(theme).forEach(([key, value]) => {
    document.documentElement.style.setProperty(`--color-${key}`, value);
    // Also set RGB variables for opacity support
    const rgb = hexToRgb(value);
    if (rgb) {
      document.documentElement.style.setProperty(
        `--color-${key}-rgb`,
        `${rgb.r}, ${rgb.g}, ${rgb.b}`
      );
    }
  });
};

export const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

export const defaultTheme: Theme = generateColorPalette("#3B82F6");
