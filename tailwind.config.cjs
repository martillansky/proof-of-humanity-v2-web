const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{ts,tsx}", "./public/**/*.html"],
  theme: {
    extend: {
      colors: {
        theme: "#ff9966",
        status: {
          vouching: "#be75ff",
          registered: "#00d9a1",
          removed: "#999999",
          revocation: "#f60c6e",
          claim: "#00d1ff",
          challenged: "#ff9900",
        },
        shade: {
          50: "#fffcfa",
          100: "#fffaf5",
          200: "#fff7f0",
          300: "#fff5eb",
          400: "#fff0e0",
          500: "#ffe0c2",
          600: "#ffD6ad",
        },
      },
      animation: {
        flip: "flip 5s linear infinite",
      },
      keyframes: {
        flip: {
          "0%, 100%": { transform: "rotateY(0deg)" },
          "50%": { transform: "rotateY(360deg)" },
        },
        // progress: {
        //   "0%": { transform: "scaleX(1)" },
        //   "100%": { transform: "scaleX(0)" },
        // },
      },
      fontFamily: {
        sans: ["Open Sans", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
  safelist: [
    "bg-status-vouching",
    "bg-status-registered",
    "bg-status-removed",
    "bg-status-revocation",
    "bg-status-claim",
    "bg-status-challenged",
    "text-status-vouching",
    "text-status-registered",
    "text-status-removed",
    "text-status-revocation",
    "text-status-claim",
    "text-status-challenged",
    "border-status-vouching",
    "border-status-registered",
    "border-status-removed",
    "border-status-revocation",
    "border-status-claim",
    "border-status-challenged",
  ],
};
