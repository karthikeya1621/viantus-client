const { colors } = require("tailwindcss/defaultTheme");

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#E46318",
          light: colors.yellow[500],
          dark: colors.yellow[700],
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms")({ strategy: "class" }),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
