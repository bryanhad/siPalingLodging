<script>
import { Icon } from '@iconify/vue';
import MyButton from './MyButton.vue';
export default {
    props: ['lodging'],
    components: {
        Icon,
        MyButton
    },
}
</script>

<template>
    <router-link :to='`/detail/${lodging.id}`'>
        <div class="flex flex-col relative mb-3">
            <MyButton class="absolute top-[0px] right-[0px]">
                <Icon icon="material-symbols:favorite-outline-rounded" class="text-2xl text-white"/>
            </MyButton>

            <div class="w-full h-[300px] rounded-lg overflow-hidden">
                <img :src="lodging.imgUrl" class="w-full h-full object-cover" alt="">
            </div>
            <section class="pt-4 font-light">
                <div class="flex justify-between">
                    <p class="font-semibold">{{ lodging.name }}</p>
                    <p>4,5</p>
                </div>
                <p>bruh</p>
                <p>
                    <span class="font-semibold">Rp. 3.000.000</span> /malam
                </p>
            </section>
        </div>
    </router-link>
</template>