/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mother': {
          1: '#ffffff',
          2: '#eeeeee',
          3: '#d7d7d7',
          4: '#77787b',
          5: '#323031',
          6: '#000000'
        },
      },
      screens: {
        'print': { 'raw': 'print' },
      },
    },
  },
  plugins: [],
}
