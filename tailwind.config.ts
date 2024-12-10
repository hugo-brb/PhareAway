import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        ouroboros: ['var(--font-ouroboros)'],
        recursive: ['var(--font-recursive)'],
        gravitas: ['var(--font-gravitas)'],
      },
    },
  },
  plugins: [],
} satisfies Config;
