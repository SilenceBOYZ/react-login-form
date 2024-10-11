/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'avg': '990px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      'tablet': { 'max': '990px' },
      'smtablet': { 'max': '768px' },
      'mobile': { 'max': '660px' }
    },
    extend: {
      keyframes: {
        floatDown: {
          '0%': { transform: 'translateY(-5rem)' },
          '100%': { transform: 'translateY(0)' },
        }
      },
      animation: {
        'floatDown': 'floatDown .3s linear forwards',
      }
    },
  },
  plugins: [],
}

