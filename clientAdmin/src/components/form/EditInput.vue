<script>
import { Icon } from '@iconify/vue';
import MyButton from '../MyButton.vue';

export default {
    components: {
        MyButton,
        Icon
    },
    props: ['value'],
    data() {
        return {
            userInput: this.value
        }
    },  
    emits: ['onCancel', 'onSubmit']
}
</script>

<template>
    <form class="flex w-full" @submit.prevent="$emit('onSubmit', userInput)">
        <input 
            type="text"
            v-model="userInput"
            class="min-w-[100px] w-full p-2 md:p-3 border-l-2 border-y-2 rounded-l-md text-slate-500 focus:outline-none"
        >
        <button
            type="submit" 
            class="px-4 bg-emerald-400 hover:bg-emerald-500 duration-300 text-white text-lg"
        >
            <Icon icon="ic:baseline-check"/>
        </button>
        <button
            type="button"
            @click="$emit('onCancel')" 
            class="px-4 bg-red-500 hover:bg-red-600 duration-300 text-white text-lg"
        >
            <Icon icon="ic:sharp-close"/>
        </button>
    </form>
</template>