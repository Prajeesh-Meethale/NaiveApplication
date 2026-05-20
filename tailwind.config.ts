import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"IBM Plex Mono"', "monospace"],
        sans: ['"IBM Plex Sans"', "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
