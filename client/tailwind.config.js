/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
          DEFAULT: '#F4F1EA',
          hover: '#FFFFFF',
        },
        success: {
          DEFAULT: '#45B97C',
          500: '#45B97C',
          600: '#3aa36c',
        },
        error: {
          DEFAULT: '#D95C68',
          500: '#D95C68',
          600: '#c44753',
        },
        warning: {
          DEFAULT: '#64748b',
          500: '#64748b',
        },
        dark: {
          bg: '#0F1115',
          sidebar: '#15181D',
          card: '#1A1E24',
          hover: '#22272F',
          border: '#2C323A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 20px -5px rgba(244, 241, 234, 0.15)',
        'glow-emerald': '0 0 20px -5px rgba(69, 185, 124, 0.25)',
        'glow-rose': '0 0 20px -5px rgba(217, 92, 104, 0.25)',
      }
    },
  },
  plugins: [],
}
