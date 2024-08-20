const { nextui } = require("@nextui-org/react");


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    colors: {
      primary: "rgb(var(--color-primary) / <alpha-value>)",
      primary: {
        background: "rgb(var(--color-primary-background) / <alpha-value>)"
      }
    },
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      dark: {
        colors: {
          primary: {
            DEFAULT: "#E73109",
            foreground: "#11181C",
          },
          background:"#222831"
        }
      },
      light: {
        colors: {

        }
      }
    }
  })]
}

