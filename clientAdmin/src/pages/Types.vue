<script>
import Table from '../components/table/Table.vue';
import TypesRow from '../components/table/TypesRow.vue';
import AddInput from '../components/form/AddInput.vue';
import getFormEntries from '../helper/getFormEntries';
import axios from 'axios';
import { useToast_ErrorAxios, useToast_SuccessAxios } from '../helper/useToast';
import LoadingData from '../components/LoadingData.vue';

export default {
    props: ['types'],
    emits: ['updateTypes', 'updateLodgings'],
    components: {
        Table,
        TypesRow,
        AddInput,
        LoadingData
    },
    methods: {
        async addNewType(e) {
            const formEntries = getFormEntries(e)
            try {
                const {data} = await axios({
                    method: 'post',
                    url: import.meta.env.VITE_BASE_URL + '/types',
                    data: formEntries,
                    headers: {access_token: localStorage.getItem('access_token')}
                })
                useToast_SuccessAxios(data.message)
                this.$emit('updateTypes')
                e.target.elements[0].value = ''
            } catch (err) {
                console.log(err)
                useToast_ErrorAxios(err)
            }
        }
    }
}
</script>

<template>
    <div class="sm:mr-auto">
        <AddInput placeholder="Add new type" :onSubmit="addNewType"/>
    </div>
    <br>
    <div v-if="!types" class="flex flex-col justify-center items-center flex-[1]">
        <LoadingData/>
    </div>
    <Table v-else :headers="['ID', 'Name', 'action']">
        <template #colGroup>
            <colgroup>
                <col style="width:8%">
                <col style="width:60%">
                <col style="width:100%">
            </colgroup>  
        </template>
        <template #tableRow>
            <TypesRow 
                v-for="(type, i) of types"
                :type="type"
                :key="i"
                v-on:updateTypes="() => $emit('updateTypes')"
                v-on:updateLodgings="$emit('updateLodgings')"
            />  
        </template>
    </Table>
</template>