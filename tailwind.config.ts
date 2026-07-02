import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#060607",
        surface: "#0C0D10",
        "surface-2": "#131418",
        line: "rgba(255,255,255,0.08)",
        "line-soft": "rgba(255,255,255,0.05)",
        ink: "#F5F6F8",
        muted: "#8A8F98",
        electric: "#2E7CFF",
        "electric-soft": "rgba(46,124,255,0.12)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        glow: "0 0 40px rgba(46,124,255,0.25)",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        blink: "blink 1s step-end infinite",
        "fade-up": "fade-up 0.7s ease forwards",
      },
    },
  },
  plugins: [],
};
export default config;
