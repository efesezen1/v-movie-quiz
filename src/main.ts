import { createApp, provide } from 'vue'
import './style.css'
import $http from './utils/AxiosSetup'
import App from './App.vue'
import $http from '@/utils/AxiosSetup'
import { createMemoryHistory, createRouter } from 'vue-router'
import PrimeVue from 'primevue/config'
import 'primeicons/primeicons.css'
import { VueQueryPlugin } from '@tanstack/vue-query'
import Aura from '@primevue/themes/aura'
import Home from './pages/Home.vue'
import About from './pages/About.vue'
const presetOptions = {
   theme: {
      preset: Aura,
   },
}

const routes = [
   { path: '/', component: Home },
   { path: '/about', component: About },
]

const router = createRouter({
   history: createMemoryHistory(),
   routes,
})

const app = createApp(App)

app.use(PrimeVue, presetOptions)
   .provide('$http', $http)
   .use(VueQueryPlugin)
   .use(router)
   .provide('$http', $http)
   .mount('#app')
