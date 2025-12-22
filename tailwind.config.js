module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['Inter', 'Montserrat', 'Arial', 'sans-serif'],
      },
      colors: {
        brand: {
          primary: '#2b2340',
          accent: '#9b6bff',
          highlight: '#f3c4ff',
          muted: '#f6f5fb',
        },
        purple: {
          50: '#f9f5ff',
          100: '#f4f0ff',
          500: '#8b5cf6',
          600: '#7c3aed'
        }
      },
      animation: {
        'fadeIn': 'fadeIn 1s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
