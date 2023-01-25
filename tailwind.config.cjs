/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./content-script/**/*.{js,ts,jsx,tsx}",
    "./popup/**/*.{js,ts,jsx,tsx}",
    "./popup/popup.html",
    "./options/**/*.{js,ts,jsx,tsx}",
    "./options/options.html"
  ],
  theme: {
    extend: {}
  },
  plugins: []
};
