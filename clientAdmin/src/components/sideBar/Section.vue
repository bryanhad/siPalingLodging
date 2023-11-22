<script>
import handleLogout from '../../handler/handleLogout';
import Link from './Link.vue';
export default {
    props: ['title', 'links', 'changePage', 'currentPage'],
    components: {
        Link
    },
    methods: {
        handleOnClick(to) {
            switch(to) {
                case 'logout':
                    return handleLogout(this.changePage)
                default: 
                    return this.changePage(to)
            }
        }
    }
}
</script>

<template>
    <div class="flex flex-col gap-3 px-4">
        <div class="flex flex-col gap-1">
            <h5 class="text-white/40">{{ title }}</h5>
            <hr class="border-white/10">
        </div>
        <div class="flex flex-col gap-4">
            <Link 
                v-for="({icon, name, to}, i) of links"
                :icon="icon"
                :name="name"
                :to="to"
                :onClick="() => handleOnClick(to)"
                :key="i"
                :currentPage="currentPage"
            ></Link>
        </div>
    </div>
</template>