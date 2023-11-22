<script>
import Form from '../components/form/Form.vue'
import InputGroup from '../components/form/InputGroup.vue'
import getData from '../helper/getData'
import Label from '../components/form/Label.vue'
import getFormEntries from '../helper/getFormEntries'
import axios from 'axios'
import { useToast_ErrorAxios, useToast_SuccessAxios } from '../helper/useToast'

export default {
    components: {
        Form,
        InputGroup,
        Label
    },
    emits: ['updateLodgings', 'changePage'],
    props: ['lodging', 'types'],
    data() {
        return {
            lodgingName: '',
            inputs: [
                {
                    id: 'name',
                    label: 'Lodging Name',
                    type: 'text',
                    value: ''
                },
                {
                    id: 'facility',
                    label: 'Lodging Facility',
                    type: 'text',
                    value: ''
                },
                {
                    id: 'roomCapacity',
                    label: 'Room Capacity',
                    type: 'number',
                    value: ''
                },
                {
                    id: 'imgUrl',
                    label: 'Image URL',
                    type: 'text',
                    value: ''
                },
                {
                    id: 'location',
                    label: 'Lodging Location',
                    type: 'text',
                    value: ''
                },
                {
                    id: 'price',
                    label: 'Price / Night',
                    type: 'number',
                    value: ''
                },
            ],
            typeId: 0,
            errors: [],
            errorShake: false,
        }
    },
    async created() {
        await this.populateInputs(localStorage.getItem('editLodging'))
    },
    methods: {
        async populateInputs(id) {
            const lodging = await getData(`/lodgings/${id}`)
            this.lodgingName = lodging.name
            this.typeId = lodging.typeId
            for (const key in lodging) {
                const inputIndex = this.inputs.findIndex(input => {
                    return input.id === key
                })
                if (inputIndex !== -1) {
                    this.inputs[inputIndex].value = lodging[key]
                }
            }
        },
        async handleSubmit(e) {
            const formEntries = getFormEntries(e)
            try {
                const {data} = await axios({
                    method: 'put',
                    url: import.meta.env.VITE_BASE_URL + `/lodgings/${localStorage.getItem('editLodging')}`,
                    data: formEntries,
                    headers: {
                        access_token: localStorage.getItem('access_token') 
                    }
                })
                useToast_SuccessAxios(data.message)
                this.$emit('updateLodgings')
                this.$emit('changePage', 'Lodgings')
            } catch (err) {
                console.log(err)
                useToast_ErrorAxios(err)
                
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
            :title="`Edit '${lodgingName}'`" 
            submitButtonText="Edit Lodging" 
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
                    <select id="typeId" name="typeId" v-model="typeId" class="text-slate-500 select select-bordered w-full max-w-xs">
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