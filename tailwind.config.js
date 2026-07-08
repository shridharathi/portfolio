/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        accent: '#6B8E23',
        'body-grey': '#8B9D6F',
      },
      fontFamily: {
        franklin: ['"Franklin Gothic Medium"', 'Helvetica', 'Arial', 'sans-serif'],
        consolas: ['Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
};
