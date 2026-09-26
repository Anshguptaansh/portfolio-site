/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif-display': ['Fraunces', 'Georgia', 'serif'],
        'serif-title':   ['Fraunces', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
