/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'black': '#1A1C1E',
        'green': '#B8F993',
        'red': '#ED7F7B',
        'darkGrey': '#2A2B2F',
        'mediumGrey': '#555559',
        'lightGrey': '#B3B3B3',
        'white': '#ffffff'
      }
    }
  },
  plugins: [],
};
