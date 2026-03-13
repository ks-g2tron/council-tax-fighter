import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0f172a",
        "cta-orange": "#f97316",
        "band-green": "#22c55e",
        "band-amber": "#f97316",
        "band-red": "#ef4444",
      },
    },
  },
  plugins: [],
};
export default config;
