/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    colors: {
      'primary-300': '#19a677',
      'primary-400': '#10855e',
      'primary-500': '#0a6e4c',
      'primary-600': '#07573c',
      'primary-700': '#043d2a',
      'secondary-300': '#f0cda5',
      'secondary-400': '#e6c095',
      'secondary-500': '#dbb385',
      'secondary-600': '#c9a275',
      'secondary-700': '#bd9362',
      'secondary-800': '#a17d52',
      'grey-300': '#dbdbdb',
      'grey-400': '#c7c6c5',
      'grey-500': '#b5b5b5',
      'grey-600': '#969595',
      'grey-700': '#777777',
      'grey-800': '#5e5d5d',
      'grey-900': '#4d4b4b',
      'red-400': '#bf172b',
      'red-500': '#b81616',
      white: '#ffffff',
      black: '#000000',
      transparent: 'transparent',
    },
    keyframes: {
      'fade-in-out': {
        '0%, 100%': {
          opacity: 0,
        },
        '20%, 70%': {
          opacity: 1,
        },
      },
    },
    animation: {
      'fade-in-out': '4s fade-in-out 1s ease-out infinite',
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
