import { useTranslation } from "@tictactoe/hooks";
import { LanguageControls } from "./LanguageControls";
import { ColorPalette } from "./ColorPalette";

const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="flex items-center justify-between p-4 bg-background">
      <h1 className="text-2xl font-bold text-primary">{t("title")}</h1>
      <div className="flex items-center gap-4">
        <ColorPalette />
        <LanguageControls />
      </div>
    </header>
  );
};

export default Header;
