<script>
import { Icon } from '@iconify/vue';

export default {
    props: {
        id: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            required: true
        },
        placeholder: {
            type: String,
        },
        type: {
            type: String,
            required: true,
            validator(value) {
                return ['text', 'number', 'password', 'email'].includes(value)
            }
        },
        required: {
            type: Boolean
        },
        error: {
            type: Object
        },
        errorShake: {
            type: Boolean
        }
    },
    components: {
        Icon
    }
}
</script>

<template lang="">
    <div class='flex flex-col gap-2'>
        <div class="flex border-b-2 relative">
            <span v-if="required" class='absolute right-0 top-0 text-red-400'>*</span>
            <label :for='id' class="cursor-pointer grid place-content-center pl-1 pr-3 py-2 text-gray-300">
                <Icon :icon='icon' class='text-2xl'/>
            </label>
            <input 
                :placeholder='placeholder'
                :id='id'
                :name='id'
                class="hover:outline-none outline-none text-slate-400 w-full"
                :type='type'
            >
        </div>
        <p v-if="error" class='text-red-400 text-sm' :class="errorShake && 'errorShake'">{{ error.message }}</p>
    </div>
</template>