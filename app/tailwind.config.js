/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgDefault: "var(--primary-bg)",
        btnPink: "var(--btn-pink)",
        btnGray: "var(--btn-gray)",
        dashboardActive: "var(--dahboard-active)",
        textActive: "var(--text-active)",
        textInActive: "var(--text-inActive)",
        tableBorder: "var(--border-table)",
        components: "var(--bg-components)",
      },
    },
  },
  plugins: [require("daisyui")],
};
