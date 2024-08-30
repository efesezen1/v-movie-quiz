import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
export default defineConfig({
   plugins: [
      vue(),
      Components({
         dts: true,
      }),
      AutoImport({
         imports: [
            'vue',
            '@vueuse/core',
            { '@tanstack/vue-query': ['useQuery', 'useQueryClient'] },
         ],
         //  resolvers: [ElementPlusResolver()],
      }),
   ],
})
