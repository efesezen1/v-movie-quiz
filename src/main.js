import { createApp } from 'vue'

// . . . FIREBASE CONFIG
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: 'AIzaSyAjzMb4r-X5YzykbGdGmVCHzEZTOP0bzig',
   authDomain: 'v-movie-quiz.firebaseapp.com',
   projectId: 'v-movie-quiz',
   storageBucket: 'v-movie-quiz.appspot.com',
   messagingSenderId: '9302044684',
   appId: '1:9302044684:web:4229b6ac88db45e68f7e29',
   measurementId: 'G-36FD5X8960',
}

// Initialize Firebase
const firebase_app = initializeApp(firebaseConfig)
const analytics = getAnalytics(firebase_app)

// Style
import './style.css'

// . . . COUNTDOWN COMPONENT
import VueCountdown from '@chenfengyuan/vue-countdown'

// . . .PAGES
import App from './App.vue'

// . . . PRIMEVUE SETUP
import PrimeVue from 'primevue/config'
import 'primeicons/primeicons.css'
import { VueQueryPlugin } from '@tanstack/vue-query'
import Image from 'primevue/image'
import Aura from '@primevue/themes/aura'
import Paginator from 'primevue/paginator'
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
import InputText from 'primevue/inputtext'
import ProgressBar from 'primevue/progressbar'
import router from './router'
const presetOptions = {
   theme: {
      preset: Aura,
   },
}

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
   .component('ProgressBar', ProgressBar)
   .component('Paginator', Paginator)
   .component('InputText', InputText)
   .component('Image', Image)
   .use(ToastService)
   .use(VueQueryPlugin)
   .use(router)
   .mount('#app')
