<script>
import Loading from './Loading.vue';

export default {
    components: {
    Loading
}
}
</script>

<template>
    <div class="flex items-center gap-4">
        <h1 class="text-slate-500">Fetching Data...</h1>
        <Loading class="text-5xl"/>
    </div>
</template>