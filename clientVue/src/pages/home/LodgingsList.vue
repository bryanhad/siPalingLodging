<script>
import { mapState, mapActions } from 'pinia'
import { useLodgingsStore } from '../../stores/lodgings';
import LodgingCard from '../../components/LodgingCard.vue';
import LodgingPagination from './LodgingPagination.vue';
import NotFound from './NotFound.vue';
import TypesList from './TypesList.vue';

export default {
    components: {
    LodgingCard,
    LodgingPagination,
    NotFound,
    TypesList
},
    computed: {
        ...mapState(useLodgingsStore, ['lodgings']),
    },
    methods: {
        ...mapActions(useLodgingsStore, ['fetchLodgings']),
    },
    async created() {
        await this.fetchLodgings()
    }
}
</script>

<template>
    <TypesList/>

    <div class="flex justify-center">
        <LodgingPagination/>
    </div>

    <template v-if="lodgings.length">
        <article class="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            <LodgingCard v-for="lodging of lodgings" :key="lodging.id" :lodging="lodging"/>
        </article>
    </template>
    <template v-else>
        <NotFound class="min-h-[400px]"/>
    </template>

</template>