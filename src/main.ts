import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar } from 'quasar'
import { createVuetify } from 'vuetify'
import router from './router'
import App from './App.vue'

// Styles
import './style.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@mdi/font/css/materialdesignicons.css'
import 'quasar/src/css/index.sass'
import 'vuetify/styles'

const app = createApp(App)
const pinia = createPinia()
const vuetify = createVuetify()

app.use(pinia)
app.use(router)
app.use(Quasar, {
  plugins: {},
})
app.use(vuetify)

app.mount('#app')