/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        accent: '#8c1538',
        'body-grey': '#c9b8a8',
        'stanford-red': '#8c1538',
        'stanford-green': '#2d5016',
        'stanford-cream': '#f5f1ed',
      },
      fontFamily: {
        franklin: ['"Franklin Gothic Medium"', 'Helvetica', 'Arial', 'sans-serif'],
        consolas: ['Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
};
