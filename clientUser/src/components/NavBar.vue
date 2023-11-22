<script>
import { mapState } from 'pinia'
import { useCustomerStore } from '../stores/customer';
import MyButton from './MyButton.vue';
import { Icon } from '@iconify/vue';
import MyLogo from './MyLogo.vue';
import MiniUser from './MiniUser.vue'

export default {
    computed: {
        ...mapState(useCustomerStore, ['isLoggedIn'])
    },
    components: {
        MyButton,
        Icon,
        MyLogo,
        MiniUser
    },
    methods: {
        handleClick() {
            console.log('clicked!')
        }
    }
}
</script>
<template>
    <nav class="flex items-center border-b-[1px] border-b-slate-100 fixed z-[100] w-full bg-white h-[60px]">
        <div class="max-w-[1240px] mx-auto w-full flex justify-between">
            <router-link to="/">
                <MyLogo class="text-lg md:text-2xl"/>
            </router-link>
            <template v-if="isLoggedIn">
                <MiniUser :user="user" class="max-md:hidden"/>

                <MyButton class="md:hidden">
                    <Icon icon="material-symbols:person" class="text-2xl text-slate-500"/>
                </MyButton>
            </template>
            <template v-else>
                <div class="flex items-center gap-4 max-md:hidden">
                    <router-link to="/register">
                        <MyButton type="outline">Register</MyButton>
                    </router-link>
                    <router-link to="/sign-in">
                        <MyButton type="accent">Sign in</MyButton>
                    </router-link>
                </div>
    
                <MyButton class="md:hidden">
                    <Icon icon="material-symbols:person" class="text-2xl text-slate-500"/>
                </MyButton>
            </template>
        </div>
    </nav>    
</template>