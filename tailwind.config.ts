import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F3F4F1",
        card: "#FBFBF9",
        ink: "#15211E",
        muted: "#5D6D68",
        faint: "#637069",
        rule: "#DCE0DA",
        accent: "#0E5C52",
        "accent-soft": "#DCE9E5",
        t70: "#A87F16",
        t80: "#D2691E",
        t90: "#B92D36",
      },
      fontFamily: {
        sans: ["'Plex Sans'", "system-ui", "sans-serif"],
        mono: ["'Plex Mono'", "ui-monospace", "monospace"],
      },
      maxWidth: { prose: "68ch", content: "62rem" },
    },
  },
  plugins: [],
};
export default config;
