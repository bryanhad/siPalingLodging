<script>
import {mapActions, mapState} from 'pinia'
import { useCustomerStore } from './stores/customer';
import Navbar from './components/Navbar.vue';

export default {
    computed: {
        ...mapState(useCustomerStore, ['isLoggedIn'])
    },  
    methods: {
        ...mapActions(useCustomerStore, ['fetchUserDetail'])
    },
    components: {
        Navbar
    },
    async created() {
        if (this.isLoggedIn) await this.fetchUserDetail()
    }
}

</script>

<template>
    <Navbar/>
    <div class="overflow-hidden flex-[1] flex flex-col mt-[60px]">
        <router-view></router-view>
    </div>
</template>