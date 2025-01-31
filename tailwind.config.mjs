/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-blue": "#1F4068",
        "primary-green": "#206A5D",
        "primary-black": "#1B1C25",
        "primary-gray": "#EBECF1",
        "primary-dark-gray": "#CED1DE",
      },
    },
    fontFamily: {
      prompt: ["Prompt"],
      anta: ["Anta"],
      almarai: ["Almarai"]
    },
  },
  plugins: [require("daisyui")],
};
