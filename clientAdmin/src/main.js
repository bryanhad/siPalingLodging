import { createApp } from "vue"
import "./style.css"
import App from "./App.vue"
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"
import VueSweetalert2 from "vue-sweetalert2"
import "sweetalert2/dist/sweetalert2.min.css"
import vue3GoogleLogin from "vue3-google-login"

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

const app = createApp(App)

app.use(Toast, options)
app.use(VueSweetalert2)
app.use(vue3GoogleLogin, {
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
})

app.mount("#app")
