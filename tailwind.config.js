/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#635BFF", // Stripe purple
          dark: "#0F172A",    // GitHub dark
        }
      }
    },
  },
  plugins: [],
}
