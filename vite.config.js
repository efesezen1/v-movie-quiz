import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
   base: '/v-movie-quiz/',
   plugins: [vue()],
   resolve: {
      alias: {
         '@': '/src',
      },
   },
})
