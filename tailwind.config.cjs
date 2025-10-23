module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        heading: ['Inter', 'Poppins', 'sans-serif'],
        mono: ['Roboto Mono', 'JetBrains Mono', 'ui-monospace', 'SFMono-Regular']
      },
      colors: {
        accent: {
          1: '#0ea5e9',
          2: '#7c3aed',
          3: '#06b6d4'
        }
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' }
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite'
      }
    }
  },
  plugins: []
}
