const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{ts,tsx}", "./public/**/*.html"],
  theme: {
    extend: {
      colors: {
        vouching: "#fa9938",
        resolving: "#5fd35f",
        disputed: "#dd47eb",
        resolved: "#3858fa",
        dark: "#26140B",
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
      // keyframes: {
      //   progress: {
      //     "0%": { transform: "scaleX(1)" },
      //     "100%": { transform: "scaleX(0)" },
      //   },
      // },
      fontFamily: {
        sans: ["Open Sans", ...defaultTheme.fontFamily.sans],
      },
    },
    // animation: {
    //   progress: "progress linear 1 forwards",
    // },
  },
  plugins: [require("@tailwindcss/forms")],
  safelist: [
    "bg-vouching",
    "text-vouching",
    "bg-resolving",
    "text-resolving",
    "bg-disputed",
    "text-disputed",
    "bg-resolved",
    "text-resolved",
  ],
};
