import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VitePluginVueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
   base: '/v-movie-quiz/',
   plugins: [vue(), VitePluginVueDevTools()],
   resolve: {
      alias: {
         '@': '/src',
      },
   },
})
