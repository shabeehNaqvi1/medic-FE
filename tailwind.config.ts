/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: ["rotate-45", "-rotate-45"],
  theme: {
    extend: {
      screens: {
        "2xl": "1536px", // Default 2xl breakpoint
        xl2: "1700px", // Custom breakpoint between 2xl and 3xl
        "3xl": "1920px", // Custom 3xl breakpoint,
        "1550px": "1550px",
      },
      colors: {
        green: {
          50: "#30AF5B",
          90: "#292C27",
        },
        gray: {
          10: "#EEEEEE",
          20: "#A2A2A2",
          30: "#7B7B7B",
          50: "#585858",
          90: "#141414",
        },
        orange: {
          50: "#FF814C",
        },
        blue: {
          70: "#021639",
        },
        yellow: {
          50: "#FEC601",
        },
      },
      backgroundImage: {
        "bg-img-1": "url('/assets/images/img-1.png')",
        "bg-img-2": "url('/assets/images//img-2.png')",
        "bg-img-3": "url('/assets/images//img-3.png')",
        "bg-img-doctor": "url('/assets/images//img-3-doctor.png')",
        "feature-bg": "url('/assets/images//feature-bg.png')",
        pattern: "url('/assets/images//pattern.png')",
        "pattern-2": "url('/assets/images//pattern-bg.png')",
      },
      //@ts-ignore
      screens: {
        xs: "400px",
        "3xl": "1680px",
        "4xl": "2200px",
      },
      maxWidth: {
        "10xl": "1512px",
      },
      borderRadius: {
        "5xl": "40px",
      },
    },
  },
  daisyui: {
    themes: [],
  },
  plugins: [require("daisyui")],
};
