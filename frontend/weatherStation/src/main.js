import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'

let app = createApp(App)

axios.defaults.baseURL = 'http://192.168.2.6:5000'

app.mount('#app')
app.use('axios')
