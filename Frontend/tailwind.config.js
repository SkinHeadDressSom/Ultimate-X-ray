/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wheat: "#FFFDFD",
        "light-gray": "#D8D9DD",
        "gray": "#ADADAD",
        "extra-light-blue": "#F4F5FA",
        "lightest-blue": "#EFF4FF",
        "light-blue": "#E4EBFF",
        "vivid-blue": "#0D42C9",
        "dark-blue": "#173996",
        "darkest-blue": "#3B365F",
        "error-color" : "#DC2626",
        "success-color" : "#5CB85C",
        "warn-color" : "#F59E08",
        "yellow-color" : "#FFDE37",
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [
    ["@tailwindcss/postcss"]
  ],
};
