import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'melon': '#FFBFB7',
        'tirian-purple': '#700353',
        'cadet-gray': '#A0ACAD',
        'celadon': '#97D8B2',
        'red-persona': '#c62b29',
        'black-persona': '#0d0d0d',
        'deep-red-persona': '#732424',
        'deep-yellow-persona': '#8c6723',
        'yellow-persona': '#f2e852'
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        serif: ['Libre Baskerville', 'serif'],
      },
    },
  },
  plugins: [],
};
export default config;
