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
          2: '#d7d7d7',
          3: '#323031',
          4: '#000000'
        },
      },
    },
  },
  plugins: [],
}
