/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#6D4C3D",
          "primary-focus": "#ff00ff",
          "primary-content": "#ffffff",
          secondary: "#ff00ff",
          "secondary-focus": "#ff00ff",
          "secondary-content": "#ffffff",
          accent: "#ff00ff",
          "accent-focus": "#ff00ff",
          "accent-content": "#ffffff",
          neutral: "#ff00ff",
          "neutral-focus": "#ff00ff",
          "neutral-content": "#ffffff",
          "base-100": "#FFFDFA",
          "base-200": "#ffffff",
          "base-300": "#ffffff",
          "base-content": "#FFFDFA",
          info: "#ff00ff",
          success: "#ff00ff",
          warning: "#ff00ff",
          error: "#ff00ff",
        },
      },
    ],
  },
};
