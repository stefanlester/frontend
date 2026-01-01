module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Poppins', 'Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          primary: '#4a2c2a',
          secondary: '#6b4423',
          accent: '#8b5a3c',
          light: '#d4a574',
          lighter: '#e8d4b8',
          dark: '#2d1b1a',
          muted: '#f9f5f0',
        },
        brown: {
          50: '#faf8f5',
          100: '#f5ede3',
          200: '#e8d4b8',
          300: '#d4a574',
          400: '#b8835d',
          500: '#8b5a3c',
          600: '#6b4423',
          700: '#4a2c2a',
          800: '#2d1b1a',
          900: '#1a0f0e',
        },
        gold: {
          50: '#fffbf0',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#f59e0b',
          500: '#d97706',
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
        'slideUp': 'slideUp 0.6s ease-out',
        'scaleIn': 'scaleIn 0.5s ease-out',
        'shimmer': 'shimmer 2s infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'brown': '0 10px 40px -10px rgba(75, 44, 42, 0.25)',
        'brown-lg': '0 20px 60px -15px rgba(75, 44, 42, 0.35)',
        'gold': '0 10px 40px -10px rgba(217, 119, 6, 0.3)',
        'inner-glow': 'inset 0 2px 20px rgba(255, 255, 255, 0.3)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-brown': 'linear-gradient(135deg, #4a2c2a 0%, #6b4423 50%, #8b5a3c 100%)',
        'gradient-gold': 'linear-gradient(135deg, #d97706 0%, #f59e0b 50%, #fcd34d 100%)',
      },
    },
  },
  plugins: [],
};
