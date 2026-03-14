import { PiniaColada } from '@pinia/colada'
import { createPinia } from 'pinia'
import { PiniaColadaPluginBroadcastSync } from 'pinia-colada-plugin-broadcast-sync'
import { createApp } from 'vue'
import App from './app.vue'
import './style.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(PiniaColada, {
  plugins: [PiniaColadaPluginBroadcastSync()],
})

app.mount('#app')
