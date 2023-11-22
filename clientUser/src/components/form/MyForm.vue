<script>
import MyButton from '../MyButton.vue';

export default {
    props: ['title', 'submitButtonText', 'template'],
    emits: ['submit'],
    components: {
        MyButton
    }
}
</script>

<template>
    <form 
        @:submit.prevent="$emit('submit')"
        class="px-12 py-8 bg-white shadow-xl"
        :class="[
            template === 'singleCol' && 'sm:w-[60%] sm:max-w-[450px] flex flex-col items-center gap-5',
            template === 'doubleCol' && 'w-full max-w-[1000px] flex flex-col items-center gap-5',
        ]"
    >
        <h1 class=" text-3xl text-slate-500 font-semibold mt-2 mb-4">{{title}}</h1>
        <div 
            class="w-full"
            :class="[
                template === 'singleCol' && 'flex flex-col gap-5 ',
                template === 'doubleCol' && 'flex max-md:flex-col md:grid md:grid-cols-2 gap-5',
            ]"    
        >
            <slot name="inputs"></slot>
            
        </div>

        <slot name="error"></slot>

        <div class="w-full max-w-[85%] mt-3">
            <MyButton class="w-full" :rounded="true" type="accent">{{ submitButtonText }}</MyButton>
        </div>

        <slot name="extra"></slot>

    </form>
</template>