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
        'text-dark'        : '#E6E6E6',   
        'selected-dark'    : '#4F7E81',  
        'primary-dark'     : '#2D5E60',   
        'secondary-dark'   : '#4F7E81',   
        'tertiary-dark'    : '#A7C6C8',   
        'quaternary-dark'  : '#1C3B3D',   
        'components-dark'  : '#006A71',   
        'background-dark'  : '#1D1D1D',   
        'default-dark'     : '#F2EFE7',

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
