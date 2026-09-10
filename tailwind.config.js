/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0A0F0E",
          soft: "#0E1513",
        },
        surface: {
          DEFAULT: "#131B19",
          high: "#1A2422",
        },
        line: "#25332F",
        bone: "#EDEEEA",
        mute: "#8B968F",
        signal: {
          DEFAULT: "#E8963C",
          dim: "#8A5F2C",
        },
        verified: {
          DEFAULT: "#4FBEA6",
          dim: "#2F6E60",
        },
        flag: "#D9614F",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "ui-serif", "Georgia", "serif"],
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        "clamp-hero": "clamp(2.75rem, 9vw, 8.5rem)",
        "clamp-h1": "clamp(2.25rem, 6vw, 5rem)",
        "clamp-h2": "clamp(1.875rem, 4.5vw, 3.5rem)",
        "clamp-h3": "clamp(1.375rem, 2.6vw, 2rem)",
        "clamp-body-lg": "clamp(1.05rem, 1.6vw, 1.375rem)",
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.16, 1, 0.3, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      backdropBlur: {
        xs: "2px",
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(2%, -3%, 0) scale(1.05)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0,0)" },
          "10%": { transform: "translate(-2%,-3%)" },
          "20%": { transform: "translate(-4%,2%)" },
          "30%": { transform: "translate(2%,-4%)" },
          "40%": { transform: "translate(-2%,5%)" },
          "50%": { transform: "translate(-4%,2%)" },
          "60%": { transform: "translate(3%,0)" },
          "70%": { transform: "translate(0,3%)" },
          "80%": { transform: "translate(-3%,0)" },
          "90%": { transform: "translate(2%,2%)" },
        },
      },
      animation: {
        drift: "drift 18s ease-in-out infinite",
        grain: "grain 8s steps(10) infinite",
      },
    },
  },
  plugins: [],
};
