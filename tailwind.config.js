/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: {
          layer: {
            1: "rgb(var(--layer-1))",
            2: "rgb(var(--layer-2))",
            3: "rgb(var(--layer-3))",
          },
          label: {
            1: "rgb(var(--label-1))",
            2: "rgb(var(--label-2) / var(--label-2-opacity))",
            3: "rgb(var(--label-3) / var(--label-3-opacity))",
            4: "rgb(var(--label-4) / var(--label-4-opacity))",
          },
          divider: {
            DEFAULT: "rgb(var(--divider) / var(--divider-opacity, 0.1))",
            2: "rgb(var(--divider-2) / var(--divider-2-opacity, 0.05))",
          },
          brand: {
            orange: "rgb(255, 161, 22)",
            yellow: "rgb(255, 192, 30)",
            green: "rgb(44, 187, 93)",
            blue: "rgb(0, 122, 255)",
            red: "rgb(239, 71, 67)",
          },
          status: {
            success: "rgb(44, 187, 93)",
            error: "rgb(239, 71, 67)",
            warning: "rgb(255, 192, 30)",
          },
          fill: {
            1: "rgb(var(--fill-1) / var(--fill-1-opacity))",
            2: "rgb(var(--fill-2) / var(--fill-2-opacity))",
            3: "rgb(var(--fill-3) / var(--fill-3-opacity))",
          },
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["Menlo", "Monaco", "Courier New", "monospace"],
      },
    },
  },
  plugins: [],
};
