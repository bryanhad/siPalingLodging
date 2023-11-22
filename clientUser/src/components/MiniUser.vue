<script>
import { Icon } from '@iconify/vue';
import {mapActions, mapState} from 'pinia'
import { useCustomerStore } from '../stores/customer';
export default {
    computed: {
        ...mapState(useCustomerStore, ['user'])
    },
    methods: {
        ...mapActions(useCustomerStore, ['logout']),
    },
    props: ['class'],
    components: {
    Icon
}
}
</script>

<template>
    <div :class="this.class" class="relative group min-w-[120px]">
        <div class="flex gap-2 items-center cursor-pointer py-1 pl-1 px-2 rounded-md group-hover:bg-slate-100">
            <div class="w-[35px] h-[35px] rounded-full overflow-hidden">
                <img :src="user.profilePicture" class="w-full h-full object-cover" alt="">
            </div>
            <p>{{ user.username }}</p>
        </div>
        <div class="absolute max-h-[0px] group-hover:max-h-[100px] overflow-hidden duration-200 bottom-0 translate-y-[100%] w-full right-0 py-1">
            <section class="bg-white p-2 rounded-md text-sm flex flex-col items-end text-slate-500">
                <router-link to="/wishlists">
                    <button class="flex gap-2 items-center py-1 px-2 hover:bg-slate-100 group/wishlist">
                        <p>WishList</p>
                        <Icon icon="ic:outline-favorite" class=" text-base group-hover/wishlist:text-pink-300"/>
                    </button>
                </router-link>
                <button @click="logout" class="flex gap-2 items-center py-1 px-2 hover:bg-slate-100 group/logout">
                    <p>Logout</p>
                    <Icon icon="ion:md-log-out" class="rotate-180 text-base group-hover/logout:text-accent"/>
                </button>
            </section>
        </div>
    </div>
</template>