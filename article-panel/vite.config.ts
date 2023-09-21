import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.includes('charlie-article-pane')
        }
      }
    })
  ],
  build: {
    minify: false,
    lib: {
      entry: './src/main.ce.ts',
      name: 'charlie-article-pane',
      fileName: 'charlie-article-pane'
    },
    outDir:"../src/main/resources/static"
  },
  define: {
    'process.env': process.env
  }
})
