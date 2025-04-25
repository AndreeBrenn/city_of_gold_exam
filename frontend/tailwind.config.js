/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    screens: {
      "<md": { max: "767px" },
      "<lg": { min: "1024px" },
    },

    extend: {
      colors: {
        "bpi-color": "#a42d31",
      },
      fontFamily: {
        Righteous: ["Righteous", "cursive"],
        Roboto: ["Roboto", "sans-serif"],
        Kanit: ["Kanit", "sans-serif"],
      },
      transitionProperty: {
        width: "width",
        spacing: "margin, padding",
      },
      animation: {
        "spin-slow": "spin 5s linear infinite",
        "bounce-slow": "bounce 2s infinite",
      },
    },
  },
  plugins: [],
};
