/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2D5A4A',
          light: '#3D7A64',
          dark: '#1D4A3A',
        },
        accent: {
          DEFAULT: '#E8A54B',
          hover: '#D4943D',
        },
        bg: {
          DEFAULT: '#F9F7F3',
          card: '#FFFFFF',
        },
        txt: {
          primary: '#2C2C2C',
          secondary: '#6B6B6B',
          muted: '#9B9B9B',
        },
      },
      fontFamily: {
        pretendard: ['Pretendard Variable', 'Pretendard', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
