<script>
import InputWithIcon from '../components/form/InputWithIcon.vue'
import GoogleLoginButton from '../components/GoogleLoginButton.vue'
import Form from '../components/form/Form.vue'
import getFormEntries from '../helper/getFormEntries'
import axios from 'axios'
import setLocalStorage from "../helper/setLocalStorage";
import {useToast_ErrorAxios, useToast_SuccessAxios} from '../helper/useToast'

export default {
    data() {
        return {
            inputs: [
                {
                    id: 'email',
                    icon: 'ic:baseline-email',
                    placeholder: 'Enter your email',
                    type: 'text'
                }, 
                {
                    id: 'password',
                    icon: 'ic:baseline-key',
                    placeholder: 'Enter your password',
                    type: 'password'
                }, 
            ],
            error: '',
            errorShake: false
        }
    },
    emits: ['changePage', 'login'],
    methods: {
        async handleSubmit(e) {
            const formEntries = getFormEntries(e)
            try {
                const res = await axios({  
                    method: 'post',
                    url: import.meta.env.VITE_BASE_URL + '/login',
                    data: formEntries
                })
                const {data, message} = res.data
                useToast_SuccessAxios(message)
                setLocalStorage(data)
                this.$emit('login')
                this.$emit('changePage', 'dashboard')
            } catch (err) {
                useToast_ErrorAxios(err)

                this.error = err.response.data.message
                this.errorShake = true

                setTimeout(() => {
                    this.errorShake = false
                }, 1000)
            }
        }
    },
    components: {
        InputWithIcon,
        GoogleLoginButton,
        Form
    }
}

</script>

<template>
    <div class="w-full h-full flex justify-center">
        <Form 
            title="LOGIN" 
            submitButtonText="Login" 
            :submitHandler="handleSubmit" 
            template="singleCol"
        >
            <template #inputs>
                <InputWithIcon 
                    v-for="({placeholder, icon, id, type}, i) of inputs" 
                    :key="i"
                    :placeholder="placeholder"
                    :icon="icon"
                    :id="id"
                    :type="type"
                />
            </template>
            <template #error v-if="this.error">
                <p class="text-red-400 text-sm" :class="this.errorShake && 'errorShake'">{{ this.error }}</p>
            </template>
            <template #extra>
                <div class="flex flex-col gap-2 items-center">
                    <p class="font-light text-slate-400">Or login with</p>
                    <GoogleLoginButton
                        @login="() => $emit('login')"
                        @changePage="(destination) => $emit('changePage', destination)"
                    />
                </div>
                <div class="h-[40px] w-full flex items-end justify-center gap-2 text-gray-400 text-sm">
                    <span>New around here?</span>
                    <button 
                        class="underline" 
                        @click="this.$emit('changePage', 'register')"
                    >Register</button>
                </div>
            </template>
        </Form>
    </div>
</template>