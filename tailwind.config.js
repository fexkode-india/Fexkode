/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],

  theme: {
    extend: {

      colors: {

        /* Main black */
        ink: "#000000",

        /* Secondary dark blue */
        panel: "#101C3A",

        /* Brand blue */
        electric: "#2563FF",

        /* Brand cyan */
        cyan: "#00C8FF",

        /* Supporting blue */
        soft: "#6EA8FF",

      },

      boxShadow: {

        glow:
          "0 0 40px rgba(37, 99, 255, 0.18)",

      },

    },
  },

  plugins: [],
};