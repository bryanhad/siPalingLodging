<script>
import Form from '../components/form/Form.vue'
import InputGroup from '../components/form/InputGroup.vue'
import getFormEntries from '../helper/getFormEntries'
import Label from '../components/form/Label.vue'
import axios from 'axios'
import { useToast, POSITION } from "vue-toastification";

export default {
    components: {
        Form,
        InputGroup,
        Label,
    },
    props: ['types'],
    emits: ['changePage', 'updateLodgings'],
    data() {
        return {
            inputs: [
                {
                    id: 'name',
                    label: 'Lodging Name',
                    type: 'text'
                },
                {
                    id: 'facility',
                    label: 'Lodging Facility',
                    type: 'text'
                },
                {
                    id: 'roomCapacity',
                    label: 'Room Capacity',
                    type: 'number'
                },
                {
                    id: 'imgUrl',
                    label: 'Image URL',
                    type: 'text'
                },
                {
                    id: 'location',
                    label: 'Lodging Location',
                    type: 'text'
                },
                {
                    id: 'price',
                    label: 'Price / Night',
                    type: 'number'
                },
            ],
            errors: [],
            errorShake: false,
        }
    },
    methods: {
        async handleSubmit(e) {
            const formEntries = getFormEntries(e)
            try {
                const {data} = await axios({
                    method: 'post',
                    url: import.meta.env.VITE_BASE_URL + '/lodgings',
                    data: formEntries,
                    headers: {
                        access_token: localStorage.getItem('access_token') 
                    }
                })
                useToast().success(data.message, {position: POSITION.TOP_CENTER})
                this.$emit('updateLodgings')
                this.$emit('changePage', 'Lodgings')
            } catch (err) {
                useToast().error('Please fill the form correctly')
                
                this.errors = err.response.data
                this.errorShake = true

                setTimeout(() => {
                    this.errorShake = false
                }, 1000)
            }
        }
    }
}
</script>

<template>
    <div class="flex justify-center">
        <Form 
            title="Add Lodging" 
            submitButtonText="Submit Lodging" 
            :submitHandler="handleSubmit" 
            template="doubleCol"
        >
            <template #inputs>
                <InputGroup
                    v-for="(input, i) of inputs"
                    :key="i"
                    :input="input"
                    :error="this.errors.find(errObj => errObj.inputName === input.id)"
                    :errorShake="errorShake"
                />
                <div class="flex flex-col gap-2">
                    <Label for="typeId">Lodging Type</Label>
                    <select id="typeId" name="typeId"  class="text-slate-500 select select-bordered w-full max-w-xs">
                        <option value="" hidden selected>Select Lodging Type</option>
                        <option v-for="(type, i) of types" 
                            :key="i"
                            :value="type.id"
                        >{{ type.name }}</option>
                    </select>
                    <p v-if="this.errors.find(errObj => errObj.inputName === 'typeId')"
                        class='text-red-400 text-sm' 
                        :class="errorShake && 'errorShake'"    
                    >
                        {{ (this.errors.find(errObj => errObj.inputName === 'typeId')).message }}
                    </p>
                </div>
            </template>
        </Form>
    </div>
</template>