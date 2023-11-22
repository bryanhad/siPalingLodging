<script>
import { Icon } from '@iconify/vue';
export default {
    props: ['title'],
    data() {
        return {
            icon: ''
        }
    },
    watch: {
        title(newTitle) {
            this.pickIcon(newTitle)
        }
    },
    components: {
        Icon
    },
    methods: {
        pickIcon(newTitle) {
            switch (newTitle) {
                case 'Dashboard':
                    return this.icon = 'material-symbols:space-dashboard'
                case 'Lodgings':
                    return this.icon = 'material-symbols:home-work'
                case 'Types':
                    return this.icon = 'ri:shapes-fill'
                case 'History':
                    return this.icon = 'icon-park-outline:history-query'
                case 'Profile':
                    return this.icon = 'material-symbols:person-rounded'
                default:
                    break;
            }
        }
    },
    created() {
        this.pickIcon(this.title)
    }
}
</script>

<template>
    <div class="flex gap-4 items-center text-slate-400">
        <Icon :icon="icon" class="text-3xl"/>
        <h1 class="sm:text-3xl text-xl">
            {{ title }}
        </h1>
    </div>
</template>