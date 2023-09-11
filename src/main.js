import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import router from "./router"

const app =createApp(App)
app.use(ElementPlus)
app.use(router)
app.mount("#app")
//createApp(App).mount('#app')
