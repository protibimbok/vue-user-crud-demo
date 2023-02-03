/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.vue',
    './src/**/*.ts',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#ECF1F5'
      }
    },
  },
  plugins: [],
}
