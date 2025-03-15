import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/tic-tac-toe/",
  plugins: [react()],
  resolve: {
    alias: {
      "@tictactoe/types": path.resolve(__dirname, "./src/types/index"),
      "@tictactoe/store": path.resolve(__dirname, "./src/store/index"),
      "@tictactoe/hooks": path.resolve(__dirname, "./src/hooks/index"),
      "@tictactoe/components": path.resolve(
        __dirname,
        "./src/components/index"
      ),
      "@tictactoe/utils": path.resolve(__dirname, "./src/utils/index"),
    },
  },
});
