import { createApp, provide } from 'vue'
import './style.css'
import VueCountdown from '@chenfengyuan/vue-countdown'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import 'primeicons/primeicons.css'
import { VueQueryPlugin } from '@tanstack/vue-query'
import Aura from '@primevue/themes/aura'
import ToastService from 'primevue/toastservice'
import Button from 'primevue/button'
import Drawer from 'primevue/drawer'
import Toast from 'primevue/toast'
import Avatar from 'primevue/avatar'
import FloatLabel from 'primevue/floatlabel'
import Select from 'primevue/select'
import SpeedDial from 'primevue/speeddial'
import Menubar from 'primevue/menubar'
import InputGroup from 'primevue/inputgroup'
import AutoComplete from 'primevue/autocomplete'
import ProgressSpinner from 'primevue/progressspinner'
import ToggleButton from 'primevue/togglebutton'
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
   .component('Button', Button)
   .component('Drawer', Drawer)
   .component('Toast', Toast)
   .component('Avatar', Avatar)
   .component('FloatLabel', FloatLabel)
   .component('Select', Select)
   .component('SpeedDial', SpeedDial)
   .component('Menubar', Menubar)
   .component('InputGroup', InputGroup)
   .component('AutoComplete', AutoComplete)
   .component('ProgressSpinner', ProgressSpinner)
   .component('ToggleButton', ToggleButton)
   .use(ToastService)
   .use(VueQueryPlugin)
   .use(router)

   .mount('#app')
