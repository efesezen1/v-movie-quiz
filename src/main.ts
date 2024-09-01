import { createApp, provide } from 'vue'
import './style.css'
import VueCountdown from '@chenfengyuan/vue-countdown'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import 'primeicons/primeicons.css'
import { VueQueryPlugin } from '@tanstack/vue-query'
import Aura from '@primevue/themes/aura'
import ToastService from 'primevue/toastservice'
// import Home from './pages/Home.vue'
// import About from './pages/About.vue'
import router from './router'
const presetOptions = {
   theme: {
      preset: Aura,
   },
}

// const routes = [
//    { path: '/', component: Home },
//    { path: '/about', component: About },
// ]

// const router = createRouter({
//    history: createMemoryHistory(),
//    routes,
// })

const app = createApp(App)

app.use(PrimeVue, presetOptions)
   .component(VueCountdown.name, VueCountdown)
   .use(ToastService)
   .use(VueQueryPlugin)
   .use(router)

   .mount('#app')
