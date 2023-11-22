<script>
import { Icon } from '@iconify/vue';
import MyButton from '../MyButton.vue';
import axios from 'axios';
import EditInput from '../form/EditInput.vue';
import { useToast_ErrorAxios, useToast_SuccessAxios } from '../../helper/useToast';

export default {
    props: ['type'],
    emits: ['updateTypes', 'updateLodgings'],
    components: {
    MyButton,
    Icon,
    EditInput
},
    data() {
        return {
            isEditing: false
        }
    },
    methods: {
        toggleEdit() {
            this.isEditing = !this.isEditing
        },
        async editType(newTypeName) {
            try {
                const {data} = await axios({
                    method: 'put',
                    url: import.meta.env.VITE_BASE_URL + `/types/${this.type.id}`,
                    data: {name: newTypeName},
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    }
                })
                this.$emit('updateTypes')
                this.$emit('updateLodgings')
                useToast_SuccessAxios(data.message)
                this.toggleEdit()
            } catch (err) {
                useToast_ErrorAxios(err)
            }
        },
        async deleteType() {
            try {
                const {data} = await axios({
                    method: 'delete',
                    url: import.meta.env.VITE_BASE_URL + `/types/${this.type.id}`,
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    }
                })
                this.$emit('updateTypes')
                this.$emit('updateLodgings')
                useToast_SuccessAxios(data.message)
            } catch (err) {
                useToast_ErrorAxios(err)
            }
        }
    }
}
</script>

<template>
    <tr>
        <td>
            <p>{{ type.id }}</p>
        </td>
        <td class="max-sm:hidden">
            <EditInput 
                v-if="isEditing"
                :value="type.name"
                @onCancel="toggleEdit"
                @onSubmit="editType"
            />
            <p v-else class="p-1">{{ type.name }}</p>
        </td>
        <td class="sm:hidden" :colspan="isEditing && 2">
            <EditInput 
                v-if="isEditing"
                :value="type.name"
                @onCancel="toggleEdit"
                @onSubmit="editType"
            />
            <p v-else class="p-1">{{ type.name }}</p>
        </td>
        <td v-if="!isEditing" class="sm:hidden">
            <div class="flex gap-4 justify-between">
                <div>
                    <MyButton :isDisabled="isEditing" type="edit" @click="toggleEdit">
                        <Icon icon="material-symbols:edit"/>
                    </MyButton>
                </div>
                <div>
                    <MyButton :isDisabled="isEditing" type="error" @click="deleteType   ">DELETE</MyButton>
                </div>
            </div>   
        </td>
        <td class="max-sm:hidden">
            <div class="flex gap-4 justify-between lg:justify-start">
                <div class="w-full lg:max-w-max">
                    <MyButton :isDisabled="isEditing" type="edit" @click="toggleEdit">
                        <Icon icon="material-symbols:edit"/>
                    </MyButton>
                </div>
                <div class="w-full lg:max-w-max">
                    <MyButton :isDisabled="isEditing" type="error" @click="deleteType   ">DELETE</MyButton>
                </div>
            </div>   
        </td>
    </tr>
</template>