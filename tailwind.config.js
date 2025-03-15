/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary, #3B82F6)",
        secondary: "var(--color-secondary, #10B981)",
        accent: "var(--color-accent, #F59E0B)",
        neutral: "var(--color-neutral, #6B7280)",
        background: "var(--color-background, #F5F2EF)",
      },
      fontFamily: {
        sans: ["Vazirmatn", "sans-serif"],
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".rtl": {
          direction: "rtl",
          "text-align": "right",
        },
        ".ltr": {
          direction: "ltr",
          "text-align": "left",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
