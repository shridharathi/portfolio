/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        accent: '#1500ff',
        'body-grey': '#868a8ead',
      },
      fontFamily: {
        franklin: ['"Franklin Gothic Medium"', 'Helvetica', 'Arial', 'sans-serif'],
        consolas: ['Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
};
