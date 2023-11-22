<script>
import MyContainer from '../../components/MyContainer.vue';
import HomeHero from './HomeHero.vue';
import LodgingsList from './LodgingsList.vue';

export default {
    components: {
    HomeHero,
    LodgingsList,
    MyContainer
}
}
</script>

<template>
    <HomeHero/>
    <MyContainer class="w-full flex flex-col gap-6 mt-4 md:mt-14 px-3">
        <LodgingsList/>
    </MyContainer>
</template>