import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import PrimeVue from 'primevue/config'
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

app.use(PrimeVue, presetOptions).use(VueQueryPlugin).use(router).mount('#app')
