/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', 
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/views/**/*.{js,jsx,ts,tsx}',
    './src/Navigation/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // MODO CLARO
        'text-light': '#121212',
        'selected-light': '#002628',
        'primary-light': '#006A71',
        'secondary-light': '#48A6A7',
        'tertiary-light': '#9ACBD0',
        'quaternary-light': '#C6DBDA',
        'components-light': '#DCE5E4',
        'background-light': '#F2EFE7',
        'default-light': '#FFFFFF',

        // MODO OSCURO
        'text-dark': '#FFFFFF',
        'selected-dark': '#FFFFFF',
        'primary-dark': '#07919A',
        'secondary-dark': '#67CED1',
        'tertiary-dark': '#A7E6E8',
        'quaternary-dark': '#E3E7E6',
        'components-dark': '#0A263D',
        'background-dark': '#121212',
        'default-dark': '#FFFFFF',

        // SECUNDARIOS
        error: '#F05C5F',
        success: '#179985',
        warning: '#EED15E',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
