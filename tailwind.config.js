/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./public/**/*.js",
  ],
  safelist: [
    // tes classes qui viennent du JSON :
    "bg-green-500/10",
    "text-green-600",
    "border-green-500/20",
    "bg-yellow-400/10",
    "text-yellow-700",
    "border-yellow-400/30",
    "bg-sky-400/10",
    "text-sky-700",
    "border-sky-400/30",
    "bg-gray-200",
    "text-gray-700",
    "border-gray-300",
    "text-pink-500",
    "text-[#5865F2]",
  ],
  theme: {
    extend: {
      fontFamily: {
        allerta: ["'Allerta Stencil'", "sans-serif"],
      },
      colors: {
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "xl-strict": "1281px",
      "2xl": "1536px",
    },
  },
  plugins: [],
};
