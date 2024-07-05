/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    dark:false
  },
  plugins: [
    // ...
    // require('@tailwindcss/aspect-ratio'),
  ],
}