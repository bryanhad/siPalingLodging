<script>
import { Icon } from '@iconify/vue'
import { mapState } from 'pinia'
import { useLodgingsStore } from '../../stores/lodgings'
export default {
    props: ['class'],
    components: {
        Icon
    },
    computed: {
        ...mapState(useLodgingsStore, ['queriedType']),
    },
}

</script>

<template>
    <div :class="this.class" class="flex flex-col items-center justify-center text-slate-400">
        <Icon icon="majesticons:emoji-sad" class="text-8xl"/>
        <h3 class="text-3xl">Lodging with type '{{ queriedType.name }}' is not found</h3>
        
    </div>
</template>