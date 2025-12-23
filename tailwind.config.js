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
          primary: "#750E6D", // 其他菜单头部紫色背景
          secondary: "#750E6D", // 菜单选中颜色以及按钮悬停颜色
          dark: "#333333",
          light: "#f8f8f8",
          blue: "#005587",
        },
      },
      fontFamily: {
        // sans: ['"Nunito Sans"', '"Microsoft YaHei"', "微软雅黑", "sans-serif"],
        sans: ['"Noto Sans SC"', "sans-serif"],
        serif: ['"Noto Serif SC"', "serif"],
      },
    },
  },
  plugins: [],
};
