const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
        grandstander: ["Grandstander"],
      },
      colors: {
        primary: "#202133",
        "secondary-green": "#318478",
        "secondary-blue": "#3B56AA",
        "secondary-orange": "#F69D62",
        "hyperlink-blue": "#1973E8",
        neutral: "#75758B",
      },
    },
  },
  plugins: [],
};
