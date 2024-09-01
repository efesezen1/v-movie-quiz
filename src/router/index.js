import { createMemoryHistory, createRouter } from 'vue-router'

const router = createRouter({
   history: createMemoryHistory(),
   routes: [
      {
         path: '/',
         component: () => import('@/layouts/MainLayout.vue'),
         redirect: { path: '/trivia' },
         children: [
            { path: '/trivia', component: () => import('@/pages/Trivia.vue') },
            { path: '/movie', component: () => import('@/pages/Movie.vue') },
         ],
      },
   ],
})

export default router
