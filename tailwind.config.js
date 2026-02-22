/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        bg: {
          primary: '#060810',
          secondary: '#0A0D1A',
          card: '#0F1220',
          hover: '#141828',
        },
        accent: {
          cyan: '#00E5FF',
          violet: '#8B5CF6',
          emerald: '#10B981',
          amber: '#F59E0B',
          rose: '#F43F5E',
        },
        surface: {
          DEFAULT: '#1A2035',
          muted: '#242B40',
          border: '#252D45',
        },
        text: {
          primary: '#E8EEFF',
          secondary: '#7A8BAD',
          muted: '#3D4A6B',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease forwards',
        float: 'float 6s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite alternate',
        'spin-slow': 'spin 20s linear infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        'border-spin': 'borderSpin 4s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(2deg)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(0,229,255,0.2)' },
          '100%': { boxShadow: '0 0 50px rgba(0,229,255,0.5), 0 0 100px rgba(0,229,255,0.1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        borderSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      boxShadow: {
        'cyan-sm': '0 0 15px rgba(0,229,255,0.2)',
        'cyan-md': '0 0 30px rgba(0,229,255,0.3)',
        'cyan-lg': '0 0 60px rgba(0,229,255,0.4)',
        'violet-sm': '0 0 15px rgba(139,92,246,0.2)',
        'card': '0 4px 40px rgba(0,0,0,0.5)',
        'card-hover': '0 8px 60px rgba(0,0,0,0.6)',
      },
    },
  },
  plugins: [],
}