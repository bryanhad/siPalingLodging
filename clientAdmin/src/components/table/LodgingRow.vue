<script>
import axios from 'axios';
import {useToast_ErrorAxios, useToast_SuccessAxios} from '../../helper/useToast'
import { Icon } from '@iconify/vue';
import MyButton from '../MyButton.vue';

export default {
    components: {
    Icon,
    MyButton
},  
    data() {
        return {
            isOwner: false
        }
    },
    created() {
        if (this.lodging.authorId === Number(localStorage.getItem('id')) || localStorage.getItem('role') === 'admin') {
            this.isOwner = true
        }
    },
    props: ['lodging'],
    emits: ['updateLodgings', 'goToEditLodgingPage', 'updateHistory'],
    methods: {
        async deleteLodging(id) {
            try {
                const {data} = await axios({
                    method: 'delete',
                    url: import.meta.env.VITE_BASE_URL + `/lodgings/${id}`,
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    }
                })
                useToast_SuccessAxios(data.message)
                this.$emit('updateLodgings')
            } catch (err) {
                useToast_ErrorAxios(err)
            }
        },
        async updateStatus(status, id) {
            if (localStorage.getItem('role') === 'staff') return

            const statusArray = ['active', 'inactive', 'archived'] //this is some big brain looping
            const newStatusIndex = (statusArray.indexOf(status) + 1) % statusArray.length
            const newStatus = statusArray[newStatusIndex] 
            try {
                const {data} = await axios({
                    method: 'patch',
                    url: import.meta.env.VITE_BASE_URL + `/lodgings/${id}`,
                    data: {status: newStatus},
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    }
                })
                useToast_SuccessAxios(data.message)
                this.$emit('updateLodgings')
                this.$emit('updateHistory')
            } catch (err) {
                useToast_ErrorAxios(err)
            }
        },
        async goToEditLodgingPage(id) {
            this.$emit('goToEditLodgingPage', id)
        }
    }
}
</script>

<template>
    <tr>
        <td>{{ lodging.id }}</td>
        <td>
            <div class="rounded-xl w-[200px] h-[120px] overflow-hidden">
                <img class="w-full h-full object-cover" :src="lodging.imgUrl" :alt="`Picture of '${lodging.name}'`">
            </div>
        </td> 
        <td>
            <div class="flex flex-col gap-1 text-[12px]">
                <div class="flex items-start gap-2">
                    <p class="min-w-[60px]">name</p>
                    <p>:</p>
                    <p>{{ lodging.name }}</p>
                </div>
                <div class="flex items-start gap-2">
                    <p class="min-w-[60px]">type</p>
                    <p>:</p>
                    <p>{{ lodging.Type.name }}</p>
                </div>
                <div class="flex items-start gap-2">
                    <p class="min-w-[60px]">price</p>
                    <p>:</p>
                    <p class="whitespace-nowrap"><span class="p-1 bg-green-500/60 rounded-md max-w-max text-white">
                            {{ lodging.price }}
                        </span>
                    </p>
                </div>
                <div class="flex items-start gap-2">
                    <p class="w-[60px]">capacity</p>
                    <p>:</p>
                    <p>{{ lodging.roomCapacity }}</p>
                </div>

            </div>
        </td> 
        <td>
            <p class="text-[13px]">{{ lodging.facility }}</p>
        </td> 

        <td>
            <MyButton 
                :type="lodging.status"
                @click="updateStatus(lodging.status, lodging.id)"
            >
                {{ lodging.status }}
            </MyButton>
        </td> 

        <td >
            <div class="flex items-center gap-2">
                <div class="h-[30px] w-[30px] rounded-full overflow-hidden grid place-content-center">
                    <img class="w-full h-full object-cover" :src="lodging.User.profilePicture" :alt="`Picture of '${lodging.User.username}'`">
                </div>
                <p>{{ lodging.User.username }}</p>
            </div>
        </td> 

        <td>
            <div class="flex gap-2" v-if="isOwner">
                <MyButton type="edit" @click="goToEditLodgingPage(lodging.id)">
                    <Icon icon="material-symbols:edit"/>
                </MyButton>
                <MyButton type="error" @click="deleteLodging(lodging.id)">DELETE</MyButton>
            </div>
        </td>
    </tr>
</template>