/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",  // <--- Add this line to enable dark mode with 'class' strategy
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
