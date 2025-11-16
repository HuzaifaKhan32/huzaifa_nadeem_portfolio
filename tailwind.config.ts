import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/AIChatbot/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        primary: "var(--primary)", 
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(-5.24%)" },
          "100%": { transform: "translateX(-55.2%)" },
        },
      },
      animation: {
        scroll: "scroll 25s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;