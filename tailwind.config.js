import {heroui} from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "custom-1": "0 0.25rem 0.5625rem -0.0625rem rgba(0, 0, 0, 0.03)",
        "custom-2": "0 0.275rem 1.25rem -0.0625rem rgba(0, 0, 0, 0.05)",
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};

module.exports = config;