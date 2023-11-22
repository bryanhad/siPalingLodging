<script>
export default {
    data() {
        return {
            username: ''
        }
    },
    created() {
        this.username = localStorage.getItem('username')
    }
}
</script>

<template>
    <div class="p-4 bg-white relative md:min-h-[200px] overflow-hidden shadow-sm">
        <div class="relative z-[1] flex flex-col md:flex-row gap-4 md:items-start md:max-w-max p-4 rounded-md text-gray-500 items-center">
            <h1 class="text-2xl">Wellcome back</h1>
            <p class="py-2 px-3 rounded-md bg-slate-400 text-white">{{ username }}</p>
        </div>

        <img class="opacity-0 duration-300 max-w-[600px] absolute right-0 bottom-0 translate-y-[30%] md:max-lg:opacity-40 lg:opacity-100 z-[0]" src="../../assets/banner_illustration.svg" alt="">
    </div>
</template>