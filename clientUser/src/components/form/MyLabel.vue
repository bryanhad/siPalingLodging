<script>
export default {
    props: ['for']
}
</script>

<template>
    <label
        class="text-slate-400 cursor-pointer max-w-max" 
        :for="this.for"
    >
    <slot></slot>
    </label>
</template>