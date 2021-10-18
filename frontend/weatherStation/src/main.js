import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'

let app = createApp(App)

axios.defaults.baseURL = 'http://localhost:5000'

app.mount('#app')
app.use('axios')
