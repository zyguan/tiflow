import { defineConfig } from 'vite'
import WindiCSS from 'vite-plugin-windicss'
import { i18nextScanner } from 'vite-plugin-i18next-scanner'
import tsConfigPath from 'vite-tsconfig-paths'
import { reactRouterPlugin } from 'vite-plugin-next-react-router'
import reactPlugin from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/dashboard/',
  plugins: [
    reactPlugin(),
    WindiCSS(),
    tsConfigPath(),
    reactRouterPlugin({ async: false }),
    i18nextScanner({ langs: ['en', 'zh'] }),
  ],
  server: {
    port: 8080,
    proxy: {
      '/api/v1': {
        target: 'http://172.16.5.32:8261',
        changeOrigin: true,
      },
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  build: {
    rollupOptions: {
      plugins: [visualizer({ template: 'treemap' })],
      output: {
        manualChunks(id) {
          if (id.includes('rc-') || id.includes('antd')) {
            return 'uikit'
          }

          if (id.includes('@ant-design/icons')) {
            return 'icons'
          }
        },
      },
    },
  },
})
