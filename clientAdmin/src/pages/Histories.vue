<script>
import LoadingData from '../components/LoadingData.vue';
import HistoryRow from '../components/table/HistoryRow.vue';
import Table from '../components/table/Table.vue';
export default {
    props: ['histories'],
    components: {
    Table,
    HistoryRow,
    LoadingData
}
}
</script>

<template>
    <div v-if="!histories" class="flex flex-col justify-center items-center flex-[1]">
        <LoadingData/>
    </div>
    <Table v-else :headers="['ID', 'Title', 'Description', 'Updated By']">
        <template #tableRow>
            <HistoryRow
                v-for="(history, i) of histories"
                :history="history"
                :key="i"
            />
        </template>
    </Table>
</template>