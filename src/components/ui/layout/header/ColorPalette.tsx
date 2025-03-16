import { useThemeStore } from "@tictactoe/store";
import { baseColors, generateColorPalette } from "@tictactoe/utils";

export const ColorPalette = () => {
  const { setTheme } = useThemeStore();

  const handleColorChange = (color: string) => {
    const theme = generateColorPalette(color);
    setTheme(theme);
  };

  return (
    <div className="flex gap-2">
      {Object.entries(baseColors).map(([name, color]) => (
        <button
          key={name}
          onClick={() => handleColorChange(color)}
          className="w-8 h-8 rounded-full transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          style={{ backgroundColor: color }}
          title={name}
        />
      ))}
    </div>
  );
};
