
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sora: "Sora",
        poppins: "Poppins",
        "source-Sans-3": "Source Sans 3",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#2C3D95",
          secondary: "#E00A11",
          accent: "#981CEB",
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#ff0000",
        },
      }
    ]
  },
  plugins: [require("daisyui")],
});