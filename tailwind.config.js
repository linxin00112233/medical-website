/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cuhk: {
          primary: "#69204c", // 其他菜单头部紫色背景
          secondary: "#c1a065", // 菜单选中颜色
          dark: "#333333",
          light: "#f8f8f8",
          blue: "#005587",
        },
      },
      fontFamily: {
        sans: ['"Noto Sans SC"', "sans-serif"],
        serif: ['"Noto Serif SC"', "serif"],
      },
    },
  },
  plugins: [],
};
