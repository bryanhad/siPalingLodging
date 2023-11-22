<script>
export default {
    props: ['type', 'isDisabled'],
    emits: ['click'],
}
</script>

<template>
    <button 
        @click="$emit('click')"
        class="flex w-full items-center justify-center gap-2 text-white px-3 md:px-5 py-2 md:py-3 rounded-md duration-300 active:scale-90"
        :class="[
            type === 'primary' && 'btn btn-primary text-white rounded-full w-full px-12',
            (type === 'active' || type === 'success') && 'bg-emerald-500 hover:bg-emerald-600',
            type === 'inactive' && 'bg-amber-400 hover:bg-amber-500',
            (type === 'archived' || type === undefined) && 'bg-slate-400 hover:bg-slate-500',
            type === 'edit' && 'bg-sky-500 hover:bg-sky-600 ',
            type === 'error' && 'bg-red-500 hover:bg-red-600',
            type === 'cancel' && 'bg-slate-300 hover:bg-slate-400',
            isDisabled && 'disabled:bg-slate-300 disabled:text-white'
        ]"
        :disabled="isDisabled"
    >
    <slot></slot>
    </button>
</template>