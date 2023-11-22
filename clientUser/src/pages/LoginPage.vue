<script>
import { mapActions, mapState } from 'pinia'
import { useCustomerStore } from '../stores/customer'
import MyForm from '../components/form/MyForm.vue';
import InputWithIcon from '../components/form/InputWithIcon.vue'
import MyContainer from '../components/MyContainer.vue';

export default {
    components: {
        MyForm,
        InputWithIcon,
        MyContainer
    },
    computed: {
        ...mapState(useCustomerStore, ['loginError', 'errorShake'])
    },
    data() {
        return {
            inputs: [
                {
                    id: 'email',
                    icon: 'ic:baseline-email',
                    placeholder: 'Enter your email',
                    type: 'text',
                    value: ''
                }, 
                {
                    id: 'password',
                    icon: 'ic:baseline-key',
                    placeholder: 'Enter your password',
                    type: 'password',
                    value: ''
                }, 
            ],
        }
    },
    methods: {
        ...mapActions(useCustomerStore, ['handleLogin']),
        getFormEntries() {
            const formEntries = {}
            this.inputs.forEach(input => {
                formEntries[input.id] = input.value
            })
            return formEntries
        }
    }
}
</script>

<template>
    <MyContainer class="w-full flex justify-center">
        <MyForm 
            title="JOIN US" 
            submitButtonText="Sign in" 
            @submit="handleLogin(getFormEntries())" 
            template="singleCol"
        >
            <template #inputs>
                <InputWithIcon
                    v-for="({placeholder, icon, id, type, value}, i) of inputs" 
                    :key="i"
                    :placeholder="placeholder"
                    :icon="icon"
                    :id="id"
                    :type="type"
                    :value="value"
                    @input="(val) => inputs[i].value = val"
                />
            </template>
    
            <template #error v-if="loginError">
                <p class="text-red-400 text-sm" :class="errorShake && 'errorShake'">{{ loginError }}</p>
            </template>
    
            <template #extra>
                <!-- <div class="flex flex-col gap-2 items-center">
                    <p class="font-light text-slate-400">Or login with</p>
                    GOOGLE LOGIN
                </div> -->
    
                <div class="h-[40px] w-full flex items-end justify-center gap-2 text-gray-400 text-sm">
                    <span>New around here?</span>
                    <router-link to="/register">
                        <button class="underline">Register</button>
                    </router-link>
                </div>
            </template>
        </MyForm>
    </MyContainer>
</template>