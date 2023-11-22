import './assets/main.css'
import "vue-toastification/dist/index.css";
import 'sweetalert2/dist/sweetalert2.min.css';

import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Toast from "vue-toastification";
import VueSweetalert2 from 'vue-sweetalert2';

const app = createApp(App)
const pinia = createPinia()

// use markRaw, so that we can access vue router in pinia!
pinia.use(({store}) => {
    store.router = markRaw(router)
})

app.use(pinia)
app.use(router)

const options = {
    position: "top-right",
    timeout: 4978,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: "button",
    icon: true,
    rtl: false,
    maxToasts: 3,
    newestOnTop: true,
}

app.use(Toast, options)
app.use(VueSweetalert2)

app.mount('#app')
