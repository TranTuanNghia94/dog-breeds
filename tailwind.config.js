const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        yellow: {
          50: "#fefaf3",
          100: "#fdf0db",
          200: "#fbe7c3",
          300: "#f9ddab",
          400: "#f7ce87",
          500: "F6C878",
          600: "#f3b64c",
          700: "#f1ac34",
          800: "#e3960f",
          900: "#9b660a",
        },
        green: {
          50: "#FCFDF9",
          100: "#F7F9F1",
          200: "#F1F5E9",
          300: "#ECF2E0",
          400: "#E6EDD5",
          500: "#DDE7C7",
          600: "#C7D0B3",
          700: "#A6AD95",
          800: "#858B77",
          900: "#63685A",
        },
        blue: {
          50: "#FBFCFC",
          100: "#F6F8F9",
          200: "#F0F4F5",
          300: "#EBF0F1",
          400: "#E3EAEC",
          500: "#DAE3E5",
          600: "#C4CCCE",
          700: "#A4AAAC",
          800: "#838889",
          900: "#626667",
        },
        grey: {
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#E5E5E5",
          300: "#D4D4D4",
          400: "#A3A3A3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
        },
        black: {
          10: "#0000001A",
          20: "#00000033",
          30: "#0000004D",
          40: "#00000066",
          50: "#00000080",
          60: "#00000099",
          70: "#000000B2",
          80: "#000000CC",
          90: "#000000E5",
          100: "#000000",
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
