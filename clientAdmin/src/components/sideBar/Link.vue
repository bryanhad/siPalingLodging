<script>
import { Icon } from '@iconify/vue';
export default {
    props: ['icon', 'name', 'onClick', 'to', 'currentPage'],
    components: {
        Icon
    },
    data() {
        return {
            isActive: false
        }
    },
    watch: {
        currentPage(newCurrentPage) {
            if (this.name === newCurrentPage) {
                this.isActive = true
            } else {
                this.isActive = false

            }
        }
    },
    created() {
        if (this.name === this.currentPage) {
            this.isActive = true
        }
    }
}
</script>

<template>
    <div
    class="flex justify-between px-2 cursor-pointer hover:text-white duration-300 group"
    :class="isActive ? 'text-white' : ''"
    @click="onClick">
        <div class="flex gap-2">
            <Icon :icon="icon" class="text-2xl"/>
            <p>{{ name }}</p>
        </div>
        <Icon 
            icon="material-symbols:arrow-drop-down" 
            class="group-hover:-rotate-90 duration-300 text-xl"
            :class="isActive ? '-rotate-90 duration-300' : ''"
        />
    </div>
</template>