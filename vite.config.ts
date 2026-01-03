import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// @ts-ignore
export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./"),
      },
    },
    server:{
      port:8080,
      host:'0.0.0.0',
    },
    build: {
      // 1. 【关键】禁用生产环境 SourceMap。
      // 开启后，他人将无法在浏览器控制台看到原始的 .tsx 源代码结构。
      sourcemap: false,

      // 2. 开启最小化压缩混淆（esbuild 比 terser 更快且足够混淆逻辑）
      minify: 'esbuild',

      // 3. 产物块优化：将业务逻辑和第三方库分离
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          // 移除构建产物中的所有注释
          comments: false,
        },
      },

      // 4. 优化资源内联：将 10kb 以下的图片/字体直接转为 base64，减少文件暴露
      assetsInlineLimit: 10240,

      // 5. 启用 CSS 代码拆分
      cssCodeSplit: true,
    },

    // 6. Esbuild 优化配置
    esbuild: {
      // 在生产环境下自动丢弃所有的 console.log 和 debugger 语句
      drop: isProd ? ['console', 'debugger'] : [],
      // 移除法律注释
      legalComments: 'none',
      // 确保 Tree Shaking 彻底
      treeShaking: true,
    },
  };
});