export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        lime: { DEFAULT: '#C8FF00', 50: '#f5ffe0', 100: '#eaffb8', 500: '#C8FF00', 600: '#a8d900' },
        dark: { DEFAULT: '#0A0A0A', 1: '#111111', 2: '#181818', 3: '#222222', 4: '#2a2a2a' },
        gold: {
          DEFAULT: '#D4AF37',
          dim: 'rgba(212,175,55,0.35)',
        },
      },
      fontFamily: {
        sans:    ['Inter', 'DM Sans', 'sans-serif'],
        mono:    ['Space Mono', 'monospace'],
        display: ['Playfair Display', 'serif'],
        data:    ['Inter', 'sans-serif'],
      }
    }
  },
  plugins: []
}
