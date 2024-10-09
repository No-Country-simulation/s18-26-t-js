import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "yellow-color":"var(--yellow-color)",
        "white-color":"var(--white-color)",
        "gray-color":"var(--gray-color)",
        "light-gray":"var(--light-gray)"
      },
      fontFamily:{
        montserratBlack:"var(--font-montserrat-black)"
      }
    },
  },
  plugins: [],
};
export default config;
