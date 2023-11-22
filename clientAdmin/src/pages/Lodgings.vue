<script>
import Table from '../components/table/Table.vue';
import LodgingRow from '../components/table/LodgingRow.vue';
import MyButton from '../components/MyButton.vue';
import LoadingData from '../components/LoadingData.vue';

export default {
    props: ['lodgings'],
    emits: ['changePage', 'updateLodgings', 'updateHistory'],
    components: {
    Table,
    LodgingRow,
    MyButton,
    LoadingData
},
    methods: {
        goToAddLodgingPage() {
            this.$emit('changePage', 'Add Lodging')
        },
        goToEditLodgingPage(id) {
            this.$emit('changePage', ['Edit Lodging', id])
        }
    }
}
</script>

<template>
    <div class="sm:mr-auto">
        <MyButton type="success" @click="goToAddLodgingPage">
            + Add New Lodging
        </MyButton>
    </div>
    <br>
    <div v-if="!lodgings" class="flex flex-col justify-center items-center flex-[1]">
        <LoadingData/>
    </div>
    <template v-else>
        <Table :headers="['ID', 'Lodging Image', 'Lodging Detail', 'Facility', 'Status', 'Author', 'Action']">
            <template #colGroup>
                <colgroup>
                    <col style="width:5%">
                    <col style="width:20%">
                    <col style="width:24%">
                    <col style="width:15%">
                    <col style="width:10%">
                    <col style="width:10%">
                    <col style="width:10%">
                </colgroup>  
            </template>
            <template #tableRow>
                <LodgingRow 
                    v-for="(lodging, i) of lodgings"
                    :lodging="lodging"
                    :key="i"
                    v-on:updateLodgings="() => $emit('updateLodgings')"
                    v-on:updateHistory="() => $emit('updateHistory')"
                    v-on:goToEditLodgingPage="goToEditLodgingPage"
                />
            </template>
        </Table>
    </template>
</template>