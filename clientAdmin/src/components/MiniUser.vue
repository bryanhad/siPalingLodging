<script>
import capitalizeFirstLetter from '../helper/capitalizeFirstLetter';

export default {
    data() {
        return {
            username: capitalizeFirstLetter(localStorage.getItem('username')),
            imgUrl: localStorage.getItem('profilePicture'),
            role: localStorage.getItem('role')
        }
    }
}
</script>

<template>
    <div class="flex gap-4 items-center">
        <div class="flex flex-col items-end sm:leading-none">
            <p class="text-slate-500 font-normal text-[12px] sm:text-sm">{{ username }}</p>
            <p 
                class="sm:text-sm font-light text-[12px] px-2 rounded-md py-1" 
                :class="role === 'admin' 
                    ? 'bg-amber-400 text-yellow-700' 
                    : 'bg-slate-400 text-white'"
            >{{ role }}</p>
        </div>
        <div class="grid place-content-center w-[35px] h-[35px] overflow-hidden rounded-full">
            <img class="w-full h-full object-cover" :src="imgUrl" :alt="`picture of ${username}`">
        </div>
    </div>        
</template>