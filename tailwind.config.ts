import type { Config } from "tailwindcss"


const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");


const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
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
        "main-w": '#FFFFFB',
        "lprimary": "#282E33",
        "mprimary": "#1D2125",
        "dprimary": "#101214",
        "backback-col": "#161A1D",
        border: "",
        input: "",
        label: '',
        ring: "hsl(var(--ring))",
        // this will change backgound of shadcn elements
        background: "#282E33",
        // this will change text of shadcn elements
        foreground: "#FFFFFB",
        primary: {
          DEFAULT: ")",
          foreground: "",
        },
        secondary: {
          DEFAULT: "",
          foreground: "",
        },
        destructive: {
          DEFAULT: "",
          foreground: "",
        },
        muted: {
          DEFAULT: "",
          foreground: "",
        },
        accent: {
          DEFAULT: "",
          foreground: "",
        },
        popover: {
          DEFAULT: "",
          foreground: "",
        },
        card: {
          DEFAULT: "",
          foreground: "",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        'spin-slow': 'spin 5s linear infinite',
      },
      fontFamily: {
        'main': ['main'],
        'second': ['second'],
        'third': ['third'],
        'fourth': ['fourth'],
        'fifth': ['fifth'],
      },
    },
  },
  plugins:
   [require("tailwindcss-animate")],
       addVariablesForColors,
} satisfies Config

export default config

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": newVars,
  });
}