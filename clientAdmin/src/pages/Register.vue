<script>
import InputWithIcon from '../components/form/InputWithIcon.vue'
import Form from '../components/form/Form.vue'
import getFormEntries from '../helper/getFormEntries'
import axios from 'axios'
import { useToast_ErrorAxios, useToast_SuccessAxios } from '../helper/useToast'
import setLocalStorage from '../helper/setLocalStorage'


export default {
    data() {
        return {
            inputs: [
                {
                    id: 'username',
                    icon: 'material-symbols:person',
                    placeholder: 'Enter your username',
                    type: 'text',
                    required: true
                }, 
                {
                    id: 'email',
                    icon: 'ic:baseline-email',
                    placeholder: 'Enter your email',
                    type: 'text',
                    required: true
                }, 
                {
                    id: 'password',
                    icon: 'ic:baseline-key',
                    placeholder: 'Enter your password',
                    type: 'password',
                    required: true
                }, 
                {
                    id: 'phoneNumber',
                    icon: 'material-symbols:call',
                    placeholder: 'Enter your phoneNumber',
                    type: 'number'
                }, 
                {
                    id: 'address',
                    icon: 'material-symbols:location-on',
                    placeholder: 'Enter your Address',
                    type: 'text'
                }, 
            ],
            errors: [],
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
                    url: import.meta.env.VITE_BASE_URL + '/register',
                    data: formEntries
                })
                const {data, message} = res.data
                useToast_SuccessAxios(message)
                setLocalStorage(data)
                this.$emit('login')
                this.$emit('changePage', 'dashboard')
            } catch (err) {
                useToast_ErrorAxios(err, 'Please fill in the form correctly')
                
                this.errors = err.response.data
                this.errorShake = true

                setTimeout(() => {
                    this.errorShake = false
                }, 1000)
            }
        }
    },
    components: {
        InputWithIcon,
        Form
    }
}

</script>

<template>
    <div class="w-full h-full flex justify-center">
        <Form 
            title="REGISTER" 
            submitButtonText="Register" 
            :submitHandler="handleSubmit" 
            template="singleCol"
        >
            <template #inputs>
                <InputWithIcon 
                    v-for="({placeholder, icon, id, type, required}, i) of inputs" 
                    :key="i"
                    :placeholder="placeholder"
                    :icon="icon"
                    :id="id"
                    :required="required"
                    :type="type"
                    :error="this.errors.find(errObj => errObj.inputName === id)"
                    :errorShake="this.errorShake"
                />
            </template>
            <template #extra>
                <div class="h-[40px] w-full flex items-end justify-center gap-2 text-gray-400 text-sm">
                    <span>Already have an account?</span>
                    <button 
                        class="underline" 
                        @click="this.$emit('changePage', 'login')"
                    >Login</button>
                </div>
            </template>
        </Form>
    </div>
</template>