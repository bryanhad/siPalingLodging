<script>
export default {
    props: ['class']
}
</script>

<template>
    <div class="h-full flex items-center">
        <h1 class="font-bold text-slate-700" :class="this.class">
            siPaling<span class="text-accent">Lodging</span>
        </h1>
    </div>
</template>