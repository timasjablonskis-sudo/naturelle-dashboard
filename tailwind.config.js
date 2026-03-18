export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#09090b',
        surface: { 1: '#18181b', 2: '#27272a' },
        primary: { DEFAULT: '#3b82f6', dim: 'rgba(59,130,246,0.12)' },
        success: { DEFAULT: '#10b981', dim: 'rgba(16,185,129,0.12)' },
        gold: { DEFAULT: '#D4AF37', dim: 'rgba(212,175,55,0.35)' },
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        mono:    ['Space Mono', 'monospace'],
        display: ['Inter', 'system-ui', 'sans-serif'],
        data:    ['Inter', 'sans-serif'],
      },
      borderColor: {
        DEFAULT: 'rgba(255,255,255,0.10)',
      },
    }
  },
  plugins: []
}
