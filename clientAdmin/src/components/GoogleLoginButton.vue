<script>
import axios from 'axios';
import { useToast_ErrorAxios, useToast_SuccessAxios } from '../helper/useToast';
import setLocalStorage from '../helper/setLocalStorage';

export default {
    emits: ['login', 'changePage'],
    methods: {
        async callback(response) {
            try {
                const {data} = await axios({
                    method: 'post',
                    url: import.meta.env.VITE_BASE_URL + "/auth/google-sign-in",
                    headers: {google_token: response.credential}
                })
                useToast_SuccessAxios(data.message)
                setLocalStorage(data.data)
                this.$emit('login')
                this.$emit('changePage', 'dashboard')
            } catch (err) {
                console.log(err)
                useToast_ErrorAxios(err)
            }
        }
    }
}
</script>

<template>
  <GoogleLogin :callback="callback"/>
</template>