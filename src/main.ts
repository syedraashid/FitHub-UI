import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar } from 'quasar'
import { createVuetify } from 'vuetify'
import router from './router/router'
import App from './App.vue'
import { initializeTracing } from './Tracing'
//fonts
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEye, faEyeSlash ,faBell ,faHouse, faDumbbell, faBowlFood, faChartSimple} from '@fortawesome/free-solid-svg-icons'

// Styles
import './style.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@mdi/font/css/materialdesignicons.css'
import 'quasar/src/css/index.sass'
import 'vuetify/styles'

library.add(faEye, faEyeSlash,faBell,faHouse,faDumbbell,faBowlFood,faChartSimple)
initializeTracing("FitHubUi");
const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
const pinia = createPinia()
const vuetify = createVuetify()

app.use(pinia)
app.use(router)
app.use(Quasar, {
  plugins: {},
})
app.use(vuetify)

app.mount('#app')