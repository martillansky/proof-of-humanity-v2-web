const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{ts,tsx}", "./public/**/*.html"],
  theme: {
    extend: {
      colors: {
        orange: "#FFB978",
        pink: "#FDC9D3",
        yellow: "#ff990040",
        yellowish: "#fffcf0",
        background: "#FCFBFA",
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
  plugins: [],
};
