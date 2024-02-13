import { screens as _screens } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        backgroundBody: '#F7F7F7',
        border: '#CECECE',
        pinkDark: '#530037',
        pinkMedium: '#83045C',
        pinkLight: '#EB0EAD',
        pinkText: '#CD3BA2',
        pinkButton: '#C00A8B',
        grey: '#001C31',
        grey2: '#909090',
      },
      fontFamily: {
        body: ['Montserrat'],
      },
    },
    screens: {
      xxxs: '320px',
      xxs: '375px',
      xs: '480px',
      ..._screens,
      '3xl': '1740px',
    },
  },
  plugins: [],
};
