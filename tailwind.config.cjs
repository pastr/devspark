/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./content-script/**/*.{js,ts,jsx,tsx}",
    "./popup/**/*.{js,ts,jsx,tsx}",
    "./popup/popup.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
