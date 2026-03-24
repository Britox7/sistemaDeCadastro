/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'app': '785px',
        'hd': '1600px',
        'fullhd': '1920px',
      }
    }
  },
  plugins: [],
}