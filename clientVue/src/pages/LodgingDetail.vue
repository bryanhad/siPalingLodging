<script>
import MyContainer from '../components/MyContainer.vue';
import { mapActions, mapState } from 'pinia';
import {useLodgingsStore} from '../stores/lodgings'
import IconWithText from '../components/IconWithText.vue';
import LoadingPage from '../components/LoadingPage.vue';
import MyButton from '../components/MyButton.vue';
import { Icon } from '@iconify/vue';
export default {
    components: {
        MyContainer,
        IconWithText,
        MyButton,
        LoadingPage,
        Icon
    },
    data() {
        return {
            lodging: {}
        }
    },
    computed: {
        ...mapState(useLodgingsStore, ['queriedLodgingDetail'])
    },
    methods: {
        ...mapActions(useLodgingsStore, ['getLodgingById', 'addToWishList', 'getLodgingQR'])
    },
    async created() {
        await this.getLodgingById(this.$route.params.id)
        this.lodging = this.queriedLodgingDetail 
        await this.getLodgingQR(this.$route.params.id)
    }
}
</script>

<template>
    <MyContainer class="w-full flex-[1]">
        <template v-if="!lodging" >
            <LoadingPage/>
        </template>
        <template v-else>
            <h1 class="text-4xl text-slate-600">{{ lodging.name }}</h1>
            <article class="flex gap-4 items-center">
                <section class="flex flex-col gap-2">
                    <div class="flex gap-2">
                        <h3>location: {{ lodging.location }}</h3> <span class="text-accent">|</span>
                        <h3>Room Capacity: {{ lodging.roomCapacity }}</h3> <span class="text-accent">|</span>
                        <h3>Lodging Type: {{ lodging.Type?.name }}</h3>
                    </div>
                    <img :src="lodging.imgUrl" class="rounded-3xl" :alt="`Picture of ${lodging.name}`">
                </section>
        
                <div class="shadow-md p-4 rounded-md flex-[1] flex flex-col items-center gap-2">
                        <img class="max-w-[30px]" :src="lodging.User?.profilePicture" alt="">
                        <div>
                            <h3>Property Owner: <span>{{ lodging.User?.username }}</span></h3>
                            <h3>Facility: <span>{{ lodging.facility }}</span></h3>
                        </div>
                        <div>
                            <IconWithText icon="ic:baseline-phone" :text="lodging.User?.phoneNumber"/>
                            <IconWithText icon="material-symbols:mail" :text="lodging.User?.email"/>
                        </div>
                        <MyButton type="wishlist" @click="addToWishList(lodging.id)">
                            <IconWithText icon="ic:outline-favorite" text="Add to wishlist"/>
                        </MyButton>
    

                        <template v-if="!lodging.QR">
                            <div class="flex flex-col gap-3 items-center mt-6">
                                <Icon icon="mingcute:loading-3-fill" class="animate-spin text-5xl"/>
                                <p>Loading QR Code...</p>

                            </div>
                        </template>
                        
                        <div v-html="lodging.QR" class="min-h-[200px] min-w-[200px]">
                        </div>
                </div>
            </article>
        </template>
    </MyContainer>
</template>