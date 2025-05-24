/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./frontend/index.html",
    "./frontend/src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // ВАЖНО
  theme: {
    extend: {},
  },
  plugins: [],
}
