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
          DEFAULT: '#22c55e', // Eco-Green
          dark: '#15803d',
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
