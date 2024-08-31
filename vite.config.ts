import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'
export default defineConfig({
   // set src directory alias
   resolve: {
      alias: {
         '@': '/src',
      },
   },
   plugins: [
      vue(),
      Components({
         dts: true,
          resolvers: [
        PrimeVueResolver()
      ]
      }),
      AutoImport({
         imports: [
            'vue',
            '@vueuse/core',
            {
               '@tanstack/vue-query': ['useQuery', 'useQueryClient'],
               axios: ['axios'],
            },
         ],
         //  resolvers: [ElementPlusResolver()],
      }),
   ],
})
