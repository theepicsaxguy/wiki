import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Deep dark blues/blacks from the screenshot
        background: '#0f1115', 
        surface: {
          900: '#0b0d11',
          800: '#151921',
          700: '#1e293b',
          600: '#334155',
        },
        primary: {
          DEFAULT: '#6366f1', // Indigo/Purple accent
          hover: '#4f46e5',
        },
        text: {
          main: '#e2e8f0',
          muted: '#94a3b8',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [
    typography,
  ],
}