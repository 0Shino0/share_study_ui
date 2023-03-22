
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path' // 用于路径

/* element-plus按需引入 */
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const resolve = (dir: string) => path.join(__dirname, dir)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    /* element按需引入 */
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    // 配置路径别名
    alias: {
      '@': resolve('./src'),
    },
  },
  css: { // css预处理器
    preprocessorOptions: {
      scss: {
        additionalData: `@import '@/assets/scss/variable.scss';`
      }
    }
  }
})
