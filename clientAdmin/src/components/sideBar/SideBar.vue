<script>
import Section from './Section.vue';
import { Icon } from '@iconify/vue';

export default {
    data() {
        return {
            burgerClicked: false,
            sections: [
                {
                    title: 'Main',
                    links: [
                        {icon:'material-symbols:space-dashboard', name:'Dashboard', to:'dashboard'},
                        {icon:'material-symbols:home-work', name:'Lodgings', to:'lodgings'},
                        {icon:'ri:shapes-fill', name:'Types', to:'types'},
                    ]
                },
                {
                    title: 'Logs',
                    links: [
                        {icon:'icon-park-outline:history-query', name:'History', to:'history'},
                    ]
                },
                {
                    title: 'Profile',
                    links: [
                        // {icon:'material-symbols:person-rounded', name:'Profile', to:'profile'},
                        {icon:'uil:sign-out-alt', name:'Logout', to:'logout'},
                    ]
                },
            ]
        }
    },
    emits: ['changePage'],
    props: ['currentPage'],
    components: {
        Section,
        Icon
    }
}
</script>

<template>
    <div v-if="burgerClicked" class="w-full h-screen fixed z-[30]" @click="() => burgerClicked = !burgerClicked"></div>

    <nav class="hidden fixed h-full lg:flex flex-col shadow-md w-[250px] bg-mygray">
        <button @click="$emit('changePage', 'Dashboard')" class="font-semibold flex gap-2 items-center mx-auto p-4 text-white my-2">
            <Icon icon="ic:baseline-home-work" class="text-2xl"/>
            <h1 class="text-xl">siPalingLodging</h1>
        </button>
        <div class="flex flex-col gap-4 text-white/40">
            <Section
                v-for="({title, links}, i) of sections"
                :title="title"
                :links="links"
                :key="i"
                :changePage="(destionation) => $emit('changePage', destionation)"
                :currentPage="currentPage"               
            />
        </div>
    </nav>

    <nav class="navbar bg-white shadow-md flex lg:hidden">
        <div class="flex-[1]">
            <button class="btn btn-ghost normal-case text-xl text-slate-600"
            @click="$emit('changePage', 'Dashboard')"    
            >
                <Icon icon="ic:baseline-home-work"/>
                siPalingLodging
            </button>
        </div>
        <div class="flex-none">
            <button class="btn btn-square btn-ghost" @click="() => burgerClicked = !burgerClicked">
                <Icon
                    class="text-2xl" 
                    :icon="burgerClicked ? 'ic:outline-close' : 'radix-icons:hamburger-menu'"/>
            </button>
        </div>
    </nav>

    <div class="flex lg:hidden flex-col shadow-md min-w-[250px] bg-mygray/95 fixed h-screen z-[50] duration-500"
        :class="burgerClicked ? 'translate-x-[0%]' : '-translate-x-[100%]'"
    >
        <button class="font-semibold flex gap-2 items-center w-full justify-center bg-mygray/40 p-4 text-white">
            <Icon icon="ic:baseline-home-work" class="text-2xl"/>
            <h1 class="text-xl">siPalingLodging</h1>
        </button>
        <div class="flex flex-col gap-4 text-white/40 mt-4">
            <Section
                v-for="({title, links}, i) of sections"
                :title="title"
                :links="links"
                :key="i"
                :changePage="(destionation) => $emit('changePage', destionation)"       
                :currentPage="currentPage"               
            />
        </div>
    </div>
</template>