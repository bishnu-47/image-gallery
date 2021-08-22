module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          main: "#69f0ae",
          light: "#9fffdf",
          dark: "#2bbc7d",
        },
        secondary: {
          main: "#673ab7",
          light: "#9a67ea",
          dark: "#320b86",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
