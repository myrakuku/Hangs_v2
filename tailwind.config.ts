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
        adminSideTop: "#0a1f33",
        adminSideBottom: "#0d3b66",
        adminAccent: "#1a936f",
        adminBg: "#f4f6f9",
      },
    },
  },
  plugins: [],
};
export default config;
