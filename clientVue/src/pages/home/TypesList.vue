<script>
import { mapState, mapActions } from 'pinia'
import { useLodgingsStore } from '../../stores/lodgings'
import { Icon } from '@iconify/vue'
import MyButton from '../../components/MyButton.vue'

export default {
    components: {
    MyButton,
    Icon,
},
    methods: {
        ...mapActions(useLodgingsStore, ['fetchTypes', 'filterByType']),
        getIconType(type) {
            switch(type) {
                case 'hotel': return 'mdi:office-building-outline'
                case 'motel': return 'fa6-solid:building'
                case 'hostel': return 'game-icons:bunk-beds'
                case 'inn': return 'tdesign:city-15'
                case 'mountain hut': return 'ic:round-cabin'
                case 'camping cabin': return 'mdi:cabin-a-frame'
                case 'love hotel': return 'material-symbols:favorite'
                case 'bed and breakfast': return 'ph:coffee-bold'
                case 'capsule hotel': return 'fluent:app-folder-28-filled'
                default: return 'icon-park-outline:close-one'
            }
        }
    },
    computed: {
        ...mapState(useLodgingsStore, ['types']),
    },
    async created() {
        await this.fetchTypes()
    }
}
</script>

<template>
    <div class="w-full flex justify-evenly flex-wrap p-3 border border-accent/50 rounded-xl">
        <MyButton 
            type="float"
            class="bg-accent text-white min-w-[80px]"
            @click="filterByType(null, null)" 
        >
        <p>All</p>
        </MyButton>
        <template v-for="e of types" :key="e.id">
            <MyButton 
                class="flex flex-col items-center text-slate-500 min-w-[80px]" 
                type="float"
                @click="filterByType(e.id, e.name)" 
            >
                <Icon :icon="getIconType(e.name)" class="text-2xl"/>
                <p class="whitespace-nowrap">{{ e.name }}</p>
            </MyButton>
        </template>
    </div>
</template>