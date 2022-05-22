module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/*.{js,html,htm}",
  ],
  theme: {
    extend: {
      colors: {
        "dark": {
          100: "#202022",
          200: "#2d2e32",
          300: "#25262a",
          400: "#0c0c0c8c",
        },
        "green": {
          100: "#64f4ac",
          200: "#64f4acea",
          300: "rgb(100, 244, 172, .7)",
          400: "#05ff82",
          500: "#15eb80",
          600: "rgb(3, 252, 128, .4)",
        },
        "red": {
          100: "#rgb(255, 0, 0, .4)",
          200: "#ff0000",
        },
        "white": {
          100: "#fff",
          200: "#ccc",
          300: "#fbfbfb",
          400: "#777"
        },
        "blue": {
          200: "#5f33e2",
          400: "#503cef",
          600: "#513cef",
          800: "#140e32"
        },
        "gradient": {
          100: "#f9dbd9",
          200: "#e0c4f5",
          300: "#f677ba"
        },
        "cream": {
          100: "#fee5a3"
        }

      }
    },
  },
  plugins: [],
}
