<script>
import { Icon } from '@iconify/vue';
import MyButton from '../MyButton.vue';

export default {
    components: {
        MyButton,
        Icon
    },
    data() {
        return {
            userInput: ''
        }
    },
    props: ['placeholder'],
    emits: ['onSubmit']
}
</script>

<template>
    <form class="flex w-full text-sm md:text-base" @submit.prevent="$emit('onSubmit')">
        <input 
            type="text"
            name="name"
            v-model="userInput"
            :placeholder="placeholder"
            class="w-full p-3 border-l-2 border-y-2 rounded-l-xl text-slate-500 focus:outline-none"
        >
        <button
            type="submit" 
            class="px-4 bg-emerald-400 rounded-r-xl hover:bg-emerald-500 duration-300 text-white text-sm md:text-lg"
        >
            ADD
        </button>
    </form>
</template>