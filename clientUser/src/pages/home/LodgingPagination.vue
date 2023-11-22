<script>
import { mapState, mapActions } from 'pinia'
import { useLodgingsStore } from '../../stores/lodgings';
import MyButton from '../../components/MyButton.vue';

export default {
    components: {
        MyButton
    },
    computed: {
        ...mapState(useLodgingsStore, ['currentPage', 'totalPages']),
    },
    methods: {
        ...mapActions(useLodgingsStore, ['fetchNextPage', 'fetchPrevPage', 'fetchPage']),
    },
}
</script>

<template>
    <div class="flex gap-2">
        <MyButton type="accent" @click="fetchPrevPage">
            Prev
        </MyButton>

        <template v-for="i in totalPages" :key="i">
            <MyButton 
                @click="fetchPage(i)"
                :type="i === currentPage ? 'activePage' : 'outline'" 
                :class="i === currentPage ? 'text-accent' : 'text-slate-400'"
                >{{ i }}</MyButton>
        </template>

        <MyButton type="accent" @click="fetchNextPage">
            Next
        </MyButton>
    </div>
</template>