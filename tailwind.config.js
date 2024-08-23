/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Inter", "Helvetica", "sans-serif"],
    },
    backgroundImage: {
      "capa-loja": "url('/src/domains/food/components/pages/capa.png')",
      "logo-loja": "url('/src/domains/food/components/pages/logo-loja.png')",
    },
  },
  plugins: [],
}
