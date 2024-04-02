import { screens as _screens } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        backgroundBody: '#F7F7F7',
        border: '#CECECE',
        borderLight: '#D9D9D9',
        pinkDark: '#530037',
        pinkMedium: '#83045C',
        pinkLight: '#EB0EAD',
        pinkText: '#CD3BA2',
        pinkButton: '#C00A8B',
        pinkBorder: '#C50B8F',
        grey: '#001C31',
        grey2: '#909090',
        grey3: '#F2F2F2',
      },
      fontFamily: {
        body: ['Montserrat'],
      },
      boxShadow: {
        buttonShadow: '0px 2px 10px rgba(186, 19, 88, 0.3)',
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
