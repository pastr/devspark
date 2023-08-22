/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./popup.html",
    "./popup.main.tsx",
    "./popup.tsx",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  corePlugins: {
    preflight: false
  },
  plugins: [],
}

