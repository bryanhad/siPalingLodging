<script>
import { Icon } from '@iconify/vue';
import Loading from './Loading.vue';

export default {
    components: {
    Icon,
    Loading
},
    props: {
        title: {
            type: String,
        },
        icon: {
            type: String
        },
        content: {
            type: Number
        },
        backgroundColor: {
            type: String
        }
    }
}
</script>

<template>
    <div class="max-lg:w-full min-h-[140px] lg:min-w-[200px] flex flex-col justify-start gap-3 py-4 px-3 sm:px-8 text-white relative" :class="backgroundColor">
        <div class="flex-[1] flex max-sm:items-center max-sm:justify-center">
            <h1 class="font-light max-sm:text-center">{{ title }}</h1>
        </div>

        <div class="hidden sm:flex items-center gap-5">
            <div class="p-3 grid place-content-center bg-white/20 rounded-xl">
                <Icon :icon="icon" class="text-4xl"/>
            </div>
            <Loading v-if="!content" class="text-3xl"/>
            <h3 class="text-4xl font-light">{{ content }}</h3>
        </div>
        <div class="sm:hidden relative z-[10] text-center flex items-center justify-center">
            <Loading v-if="!content" class="text-3xl"/>
            <h3 class="text-4xl font-light">{{ content }}</h3>
        </div>
        <Icon :icon="icon" class="sm:hidden text-[20vw] opacity-30 absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]"/>
    </div>
</template>