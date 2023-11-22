<script>
import MyButton from '../components/MyButton.vue';
import MyContainer from '../components/MyContainer.vue';
import { Icon } from '@iconify/vue';
export default {
    components: {
    Icon,
    MyContainer,
    MyButton
},
    data() {
        return {
            path: this.$route.path
        }
    },
}
</script>

<template>
    <MyContainer class="w-full flex justify-center items-center flex-[1] pb-[150px]">
        <section class="flex flex-col items-center gap-3 max-w-max text-slate-400">
            <div class="flex flex-col md:flex-row items-center gap-3">
                <Icon icon="solar:confounded-square-line-duotone" class="text-8xl"/>
                <h1 class="text-3xl font-semibold ">OOPS!</h1>
            </div>
            <p>There are is no page '{{ path }}'</p>
            <p>Maybe you are lost.. let's head back to home!</p>
            <router-link to="/">
                <MyButton type="accent">
                    Home
                </MyButton>
            </router-link>

        </section>

    </MyContainer>
</template>