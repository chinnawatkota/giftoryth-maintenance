/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        maroon: '#7D0A0A',
        'main-red': '#BF3131',
        beige: '#EAD196',
        'main-yellow': '#F3EDC8',
        main: '#61100D',
        'shadow-black': '#100C08',
        'main-white': '#FCFCFF',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light', 'dark', 'cupcake', 'bumblebee', 'emerald', 'corporate'],
    darkTheme: 'dark',
    base: true,
    styled: true,
    utils: true,
  },
};
