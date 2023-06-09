import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import viteCompression from 'vite-plugin-compression'
import path from 'path'

// 自动引入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  console.log('import.meta', env.VITE_APP_TITLE)
  return {
    base: './',
    build: {
      outDir: 'wows'
    },
    // logLevel: 'error',
    plugins: [
      vue(),
      eslintPlugin({
        include: [
          'src/**/*.js',
          'src/**/*.ts',
          'src/**/*.vue',
          'src/*.js',
          'src/*.ts',
          'src/*.vue',
          'src/**/*.styl'
        ]
      }),
      viteCompression({ threshold: 100 * 1000 }), // 超过100k进行压缩
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ],
    server: {
      host: true
    },
    resolve: {
      alias: {
        // 当使用文件系统路径的别名时，请始终使用绝对路径。相对路径的别名值会原封不动地被使用，因此无法被正常解析。
        '@': path.resolve(__dirname, './src')
      }
    },
    css: {
      preprocessorOptions: {
        stylus: {
          imports: [
            path.resolve(__dirname, './src/assets/stylus/reset.styl'),
            path.resolve(__dirname, './src/assets/stylus/variables.styl')
          ]
        }
      }
    }
    // define: { 'process.env': {} }
  }
})
