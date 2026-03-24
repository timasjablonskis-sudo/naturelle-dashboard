export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#09090b',
        surface: { 1: '#18181b', 2: '#27272a' },
        primary: { DEFAULT: '#059669', dim: 'rgba(5,150,105,0.12)' },
        success: { DEFAULT: '#10b981', dim: 'rgba(16,185,129,0.12)' },
        gold: { DEFAULT: '#D4AF37', dim: 'rgba(212,175,55,0.35)' },
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
        display: ['Playfair Display', 'serif'],
        data:    ['JetBrains Mono', 'monospace'],
      },
      borderColor: {
        DEFAULT: 'rgba(255,255,255,0.10)',
      },
    }
  },
  plugins: []
}
