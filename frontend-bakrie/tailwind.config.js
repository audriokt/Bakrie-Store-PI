/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ookay: "#FEE7E7",
        yes: "#C31D1D",
      },
    },
  },
  plugins: [],
}