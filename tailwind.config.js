/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      boxShadow: {
        'md': '0 0 10px rgba(0, 0, 0, 0.1)',
      },
      colors: {
        'primary-light': '#FFFFFF',
        'primary-dark': '#3f4040',
        'secondary': '#48937e',
        'variant1-light': '#F3F4F6',
        'variant1-dark': '#2d2e2e',
        'Heading': '#4B5563',
        'Red': '#FF3C5F'
      },
      fontFamily:{
        'body':"Open Sans"
      }
    },
  },
  plugins: [],
}