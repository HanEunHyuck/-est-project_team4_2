/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.html"],
  theme: {
    extend: {
      colors: {
        primary: "#FD3C1A",
        bg: "#191919",
        active: "#D9D9D9",
      },
      maxHeight: {
        dropdown: "352px",
      },
      backgroundPosition: {
        right: "15rem",
      },
      backgroundImage: {
        "arrow-down": "url('./../images/arrow_down.svg')",
        "arrow-more": "url('./../images/arrow_more.svg')",
      },
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
      },
      fontSize: {
        40: "40px",
      },
    },
  },
  plugins: [],
};
