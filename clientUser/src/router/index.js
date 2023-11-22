import { createRouter, createWebHistory } from "vue-router"
import HomePage from "../pages/home/HomePage.vue"
import LodgingDetail from "../pages/LodgingDetail.vue"
import LoginPage from "../pages/LoginPage.vue"
import RegisterPage from "../pages/RegisterPage.vue"
import CustomerWishlist from "../pages/CustomerWishlist.vue"
import NotFound from "../pages/NotFound.vue"
import { useCustomerStore } from "../stores/customer"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomePage,
        },
        {
            path: "/detail/:id",
            name: "detail",
            component: LodgingDetail,
        },
        {
            path: "/sign-in",
            name: "signIn",
            component: LoginPage,
        },
        {
            path: "/register",
            name: "register",
            component: RegisterPage,
        },
        {
            path: '/wishlists',
            name: 'wishlists',
            component: CustomerWishlist
        },
        { 
            path: '/:pathMatch(.*)*', 
            name: 'NotFound', 
            component: NotFound 
        },
    ],
})

router.beforeEach((to, from, next) => {
    const isLoggedIn = localStorage.getItem('access_token')
    if (isLoggedIn) {
        if (to.name === 'signIn' || to.name === 'register') return next({name: 'home'})
        next()
    } else {
        if (to.name === 'signIn' || to.name === 'register') {
            useCustomerStore().clearErrorStates()
            return next()
        }
        if (to.name === 'wishlists') return next({name: 'home'})
        next()
    }
})

export default router
