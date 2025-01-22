/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#FD3C1A",
        bg: "#191919",
        active: "#D9D9D9",
        gray62: "#626262",
        "login-border": "#4D4B4B",
      },
      maxHeight: {
        dropdown: "352px",
      },
      backgroundPosition: {
        right: "15rem",
      },
      backgroundImage: {
        "arrow-down": "url('./../images/arrow_down.svg')",
        "arrow-down-thin": "url('./../images/arrow_down_thin.svg')",
        "arrow-more": "url('./../images/arrow_more.svg')",
        search: "url('./../images/search.svg')",
        clear: "url('./../images/clear.svg')",
      },
      width: {
        "arrow-down-thin": "26px",
        75: "300px",
        100: "400px",
        140: "560px",
      },
      height: {
        150: "600px",
      },
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
      },
      fontSize: {
        40: "40px",
      },
      borderRadius: {
        "4xl": "28px",
      },
      borderWidth: {
        0.5: "0.5px",
      },
      margin: {
        4.5: "18px",
        22.5: "90px",
        24.5: "98px",
        26.5: "106px",
        29.5: "118px",
        78: "312px",
      },
    },
  },
  plugins: [],
};
