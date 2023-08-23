/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(rgba(0, 0, 0, 0.72) 0%, rgba(0, 0, 0, 0.48) 0.01%, rgba(0, 0, 0, 0) 100%)",
      },
    },
  },
  plugins: [],
};
