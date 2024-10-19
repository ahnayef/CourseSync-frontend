/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5A79E8",
        black: "#1d1d1d",
      },
      fontFamily: {
        notoSB: ["NotoSansBengali_400Regular", "sans-serif"],
      },
    },
  },
  plugins: [],
};
