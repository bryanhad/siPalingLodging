<script>
export default {
    props: ['class']
}
</script>

<template>
    <main :class="this.class" class="max-w-[1240px] mx-auto">
        <slot></slot>
    </main>
</template>