import axios from "axios";
import { defineStore } from "pinia";
import { useToast_ErrorAxios, useToast_SuccessAxios } from "../helper/useToast";

export const useCustomerStore = defineStore('customer', {
    state: () => ({
        user: {},
        isLoggedIn: localStorage.getItem('access_token'),
        loginError: '',
        registerErrors: [],
        errorShake: false,
        wishlists: [],
    }),
    actions: {
        async handleRegister(formEntriesObj) {
            try {
                const res = await axios({
                    method: 'POST',
                    url: import.meta.env.VITE_BASE_URL + '/register',
                    data: formEntriesObj
                })
                const {message, data} = res.data

                useToast_SuccessAxios(message)
                this.user = {
                    id: data.id,
                    username: data.username,
                    profilePicture: data.profilePicture,
                    email: data.email,
                }
                localStorage.setItem('access_token', data.access_token)
                this.isLoggedIn =  data.access_token

                this.router.push('/')
            } catch (err) {
                useToast_ErrorAxios(err, 'Please fill in the form correctly')

                this.registerErrors = err.response.data
                this.errorShake = true

                setTimeout(() => {
                    this.errorShake = false
                }, 1000)
            }
        },
        async handleLogin(formEntriesObj) {
            try {
                const res = await axios({
                    method: 'POST',
                    url: import.meta.env.VITE_BASE_URL + '/login',
                    data: formEntriesObj
                })
                const {message, data} = res.data

                useToast_SuccessAxios(message)
                this.user = {
                    id: data.id,
                    username: data.username,
                    profilePicture: data.profilePicture,
                    email: data.email,
                }
                localStorage.setItem('access_token', data.access_token)
                this.isLoggedIn =  data.access_token

                this.router.push('/')
            } catch (err) {
                // useToast_ErrorAxios(err)

                this.loginError = err.response.data.message
                this.errorShake = true

                setTimeout(() => {
                    this.errorShake = false
                }, 1000)
            }
        },
        async fetchUserDetail() {
            try {
                const {data} = await axios({
                    method: 'GET',
                    url: import.meta.env.VITE_BASE_URL + '/user',
                    headers: {access_token: this.isLoggedIn}
                })
                this.user = data
            } catch (err) {
                useToast_ErrorAxios('', 'Failed to fetch user detail')
                console.log(err)
            }
        },
        logout() {
            localStorage.removeItem('access_token')
            useToast_SuccessAxios('Logout Seuccessful')
            this.isLoggedIn = null
            this.router.push({name: 'home'})
        },
        clearErrorStates() {
            this.loginError = ''
            this.registerErrors = []
        },
        async fetchWishlists() {
            try {
                const {data} = await axios({
                    method: 'GET',
                    url: import.meta.env.VITE_BASE_URL + '/wishlists',
                    headers: {access_token: this.isLoggedIn}
                })
                this.wishlists = data.data
            } catch (err) {
                console.log(err)
            }
        }
    }
})