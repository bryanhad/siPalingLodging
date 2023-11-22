<script>
import MyContainer from '../components/MyContainer.vue';
import InputWithIcon from '../components/form/InputWithIcon.vue';
import MyForm from '../components/form/MyForm.vue';
import { mapActions, mapState } from 'pinia';
import { useCustomerStore } from '../stores/customer';

export default {
    components: {
        MyContainer,
        MyForm,
        InputWithIcon
    },
    data() {
        return {
            inputs: [
                {
                    id: 'username',
                    icon: 'material-symbols:person',
                    placeholder: 'Enter your username',
                    type: 'text',
                    value: '',
                    required: true,
                }, 
                {
                    id: 'email',
                    icon: 'ic:baseline-email',
                    placeholder: 'Enter your email',
                    type: 'text',
                    value: '',
                    required: true,
                }, 
                {
                    id: 'password',
                    icon: 'ic:baseline-key',
                    placeholder: 'Enter your password',
                    type: 'password',
                    value: '',
                    required: true,
                }, 
                {
                    id: 'phoneNumber',
                    icon: 'material-symbols:call',
                    placeholder: 'Enter your phoneNumber',
                    type: 'number',
                    value: '',
                }, 
                {
                    id: 'address',
                    icon: 'material-symbols:location-on',
                    placeholder: 'Enter your Address',
                    type: 'text',
                    value: '',
                }, 
            ],
        }
    },
    computed: {
        ...mapState(useCustomerStore, ['registerErrors', 'errorShake'])
    },
    methods: {
        ...mapActions(useCustomerStore, ['handleRegister']),
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
            title="REGISTER" 
            submitButtonText="Register" 
            @submit="handleRegister(getFormEntries())" 
            template="singleCol"
        >
            <template #inputs>
                <InputWithIcon
                    v-for="({placeholder, icon, id, type, value, required}, i) of inputs" 
                    :key="i"
                    :placeholder="placeholder"
                    :icon="icon"
                    :id="id"
                    :type="type"
                    :value="value"
                    :required="required"
                    :error="this.registerErrors.find(errObj => errObj.inputName === id)"
                    :errorShake="this.errorShake"
                    @input="(val) => inputs[i].value = val"
                />
            </template>
    
            <template #extra>   
                <div class="h-[40px] w-full flex items-end justify-center gap-2 text-gray-400 text-sm">
                    <span>Already have an account?</span>
                    <router-link to="/sign-in">
                        <button class="underline">Sign in</button>
                    </router-link>
                </div>
            </template>
        </MyForm>
    </MyContainer>
</template>