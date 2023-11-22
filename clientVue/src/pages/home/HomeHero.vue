<script>
import { Icon } from '@iconify/vue';
import MyButton from '../../components/MyButton.vue';
import MyContainer from '../../components/MyContainer.vue';

export default {
    components: {
        Icon,
        MyButton,
        MyContainer
    },
    data() {
        return {
            priceRange: 0
        }
    },
    computed: {
        startingPrice() {
            return this.getStartingPrice(this.priceRange)
        }
    },
    methods: {
        getStartingPrice(price) {
            const startingPrice = price * 500_000
            return startingPrice.toLocaleString("id-ID", { style: "currency", currency: "IDR" })
        }
    }
}
</script>

<template>
        <section class="max-md:h-[90vh] md:h-[60vh] w-full relative max-md:flex max-md:flex-col">
        <div style="background-image: url('https://fernwoodcircle.com/wp-content/uploads/2022/01/quiet-creek-escape-bnb-living-room-1024x576.png');" class="w-full h-full absolute top-0 left-[50%] -translate-x-[50%] brightness-[40%] bg-no-repeat bg-cover"></div>
        
        
        <MyContainer class="flex-[1] flex flex-col justify-evenly gap-8 relative h-full py-4">
            <!-- hero model -->
            <div class="absolute right-0 max-xl:right-[50%] w-[560px] h-full max-xl:translate-x-[56%] max-xl:brightness-50 max-xl:bottom-0 brightness-[80%] z-[1]">
                <img src="../../assets/images/heroModel.png" class="w-full h-full max-md:object-cover object-contain absolute" alt="Hero model">
            </div>

            <!-- title -->
            <div class="px-4 relative z-[11] text-white text-center xl:text-start max-w-max">
                <h1 class="font-bold text-6xl">
                    Find your next stay
                </h1>
                <p class="mt-2 text-2xl font-light">Let us do the hard work</p>
            </div>

            <!-- filter inputs -->
            <div class="relative w-full z-[10] px-3 md:absolute md:bottom-0 md:translate-y-[50%]">
                <form @submit.prevent="printPrice" class="grid grid-cols-1 md:grid-cols-8 gap-3">
                    <!-- filter location -->
                    <section class="text-slate-400 flex gap-3 text-lg rounded-full items-center shadow-md overflow-hidden px-5 bg-white col-span-3">
                        <input id="location" type="text" class="p-3 flex-[1]" placeholder="Search by location...">
                        <label for="location">
                            <Icon icon="material-symbols:search-rounded" class="text-2xl md:text-4xl"/>
                        </label>
                    </section>
                    <!-- filter starting price -->
                    <section class="text-white flex flex-col gap-1 text-lg items-center shadow-md overflow-hidden px-5 bg-white rounded-full py-4 col-span-3">
            
                        <label for="default-range" class="block mb-1 text-slate-400">Starting Price: {{ startingPrice }}</label>
                        <input v-model="priceRange"
                            id="startingPrice" type="range" min="0" max="20"
                            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">
                    </section>
                    <!-- submit button -->
                    <MyButton type="accent" :rounded="true" class="w-full col-span-2">Search</MyButton>
                </form>
            </div>
        </MyContainer>
    </section>
</template>