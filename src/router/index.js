import { getAuth } from 'firebase/auth'
import { createMemoryHistory, createRouter } from 'vue-router'

const router = createRouter({
   history: createMemoryHistory(),
   routes: [
      {
         path: '/',
         component: () => import('@/layouts/MainLayout.vue'),
         redirect: { path: '/home' },
         children: [
            { path: '/home', component: () => import('@/pages/Home.vue') },
            { path: '/trivia', component: () => import('@/pages/Trivia.vue') },
            { path: '/movie', component: () => import('@/pages/Movie.vue') },
            { path: '/sign-in', component: () => import('@/pages/SignIn.vue') },
            {
               path: '/register',
               component: () => import('@/pages/Register.vue'),
            },
            {
               path: '/feed',
               component: () => import('@/pages/Feed.vue'),
               meta: {
                  requiresAuth: true,
               },
            },
         ],
      },
   ],
})

router.beforeEach((to, from, next) => {
   console.log('guard! => to', to)
   if (to.path === '/feed' && getAuth().currentUser === null) {
      next('/sign-in')
   } else {
      next()
   }
   // if (to.matched.some((record) => record.meta.requiresAuth)) {
   //    if (getAuth().currentUser === null) {
   //       next({
   //          path: '/sign-in',
   //          query: { redirect: to.fullPath },
   //       })
   //    } else {
   //       next()
   //    }
   // } else {
   //    console.log('user', getAuth().currentUser)
   //    next()
   // }
})

export default router
