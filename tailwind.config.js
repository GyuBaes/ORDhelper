/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      pc: '1921px',
    },
    extend: {
      fontFamily: {
        suit: ['IBMPlexSansKR-Regular', 'sans-serif'],
      },
      keyframes: {
        opacity: {
          '0%%': { opacity: 0 },
          '40%': { opacity: 0 },
          '50%': { opacity: 1 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
