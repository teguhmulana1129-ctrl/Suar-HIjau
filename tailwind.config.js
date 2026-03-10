/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', '"Geist"', 'system-ui', 'sans-serif'],
        mono: ['"Berkeley Mono"', 'monospace'],
      },
      colors: {
        primary: {
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
          950: '#052e16',
          DEFAULT: '#22c55e', // Eco-Green
          dark: '#15803d',
        },
        dark: {
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
        },
        secondary: '#f59e0b', // Warm
        accent: '#ef4444', // Coral
        neutral: {
          DEFAULT: '#6b7280', // Gray
        },
        background: '#fafaf9',
        surface: '#ffffff',
      },
      animation: {
        'fade-up': 'fadeSlideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'breathe': 'breathe 20s ease-in-out infinite',
        'shimmer': 'shimmer 4s linear infinite',
        'pulse-bar': 'pulse-bar 1s ease-in-out infinite',
      },
      keyframes: {
        fadeSlideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
        },
        shimmer: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'pulse-bar': {
          '0%, 100%': { transform: 'scaleY(1)', opacity: '0.8' },
          '50%': { transform: 'scaleY(1.5)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
