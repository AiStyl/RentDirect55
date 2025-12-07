/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'palm': {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        'sunset': {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        'sand': {
          50: '#fdfbf7',
          100: '#f9f5eb',
          200: '#f3ebd7',
          300: '#e8dbb8',
          400: '#d9c48e',
          500: '#c9ad6a',
          600: '#b89a52',
          700: '#9a7d43',
          800: '#7d653a',
          900: '#665332',
        }
      },
      fontFamily: {
        'display': ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
        'body': ['Verdana', 'Geneva', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
