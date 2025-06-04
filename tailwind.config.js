/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f3f0ff',
          100: '#e9e3ff',
          200: '#d4c6ff',
          300: '#b89aff',
          400: '#9a66ff',
          500: '#7928CA', // Primary purple
          600: '#6c20b6',
          700: '#591a95',
          800: '#491879',
          900: '#3d1664',
        },
        secondary: {
          50: '#fffaeb',
          100: '#fff1c6',
          200: '#ffe083',
          300: '#ffca41',
          400: '#ffb800', // Secondary gold
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#783610',
        },
        accent: {
          50: '#effdfd',
          100: '#d2f7f9',
          200: '#a8edf3',
          300: '#6edce6',
          400: '#35c7d4',
          500: '#06B6D4', // Accent teal
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.5s ease-out',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};