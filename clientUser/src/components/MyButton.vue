<script>
export default {
    emits: ['click'],
    props: ['type', 'class', 'rounded']
}
</script>

<template>
    <button @click="$emit('click')"
        class="p-2 min-h-[50px]"
        :class="[
            type === 'outline' && 'outline outline-slate-200 outline-[1px]',
            type === 'accent' && 'bg-accent text-white',
            type === 'activePage' && 'outline outline-accent outline-[1px] text-accent',
            type === 'float' && 'hover:-translate-y-[3px] duration-150',
            type === 'wishlist'&& 'bg-pink-300 text-white hover:-translate-y-[3px] duration-150',
            rounded ? 'rounded-full' : 'rounded-lg',
            this.class
        ]" 
    >
        <slot></slot>
    </button>
</template>