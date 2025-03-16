import { useTranslation } from "@tictactoe/hooks";

export const LanguageControls = () => {
  const { t, language, setLanguage } = useTranslation();

  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value as "en" | "fa")}
      className="p-2 rounded-lg bg-neutral/20 focus:outline-none focus:ring-2 focus:ring-primary"
    >
      <option value="en">{t("english")}</option>
      <option value="fa">{t("persian")}</option>
    </select>
  );
};
