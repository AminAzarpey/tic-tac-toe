import { ReactNode } from "react";
import { Header } from "@tictactoe/components";
import { useTranslation } from "@tictactoe/hooks";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { language } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Header />
      <main
        className={`container mx-auto px-4 py-8 ${
          language === "fa" ? "rtl" : "ltr"
        }`}
      >
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
};
