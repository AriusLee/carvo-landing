import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // Preflight off: the ported styles.css owns the base reset and is the pixel
  // spec for this page. Tailwind utilities remain available for future work
  // (app + admin portal) without clobbering the tuned landing-page styles.
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors: {
        bg: "#0A0A0A",
        panel: "#121212",
        ink: "#EDEDED",
        muted: "#8A8A90",
        orange: "#F26A21",
      },
      fontFamily: {
        display: ["var(--font-anton)", "Arial Narrow", "sans-serif"],
        text: ["var(--font-archivo)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
