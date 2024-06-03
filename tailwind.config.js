/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        buttonGreen: "hsl(169, 82%, 27%)",
      },
    },
  },
  plugins: [],
};
