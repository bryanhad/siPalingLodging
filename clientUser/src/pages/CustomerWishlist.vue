<script>
import MyContainer from '../components/MyContainer.vue';
import MyTitle from '../components/MyTitle.vue';
import { mapActions, mapState } from 'pinia';
import { useCustomerStore } from '../stores/customer';
import LodgingCard from '../components/LodgingCard.vue';
export default {
    components: {
    MyContainer,
    LodgingCard,
    MyTitle
},
    methods: {
        ...mapActions(useCustomerStore, ['fetchWishlists'])
    },
    computed: {
        ...mapState(useCustomerStore, ['wishlists', 'user'])
    },
    async created() {
        await this.fetchWishlists()
    }
}
</script>

<template>
    <MyContainer class="w-full flex-[1] flex-col flex gap-10 mt-5">
        <MyTitle>{{ user.username }}'s Wishlists</MyTitle>
        <template v-if="wishlists.length">
            <article class="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                <LodgingCard v-for="wishlist of wishlists" :key="wishlist.id" :lodging="wishlist.Lodging"/>
            </article>
        </template>
        <template v-else>
           <MyTitle>You don't have any wishlists!</MyTitle>
        </template>
    </MyContainer>
</template>