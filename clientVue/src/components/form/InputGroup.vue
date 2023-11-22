<script>
import FormLabel from './FormLabel.vue';
export default {
    props: ['input', 'error', 'errorShake'],
    components: {
        FormLabel
    }
}
</script>

<template>
    <div 
        class="flex flex-col gap-2"
    >
        <FormLabel :for="input.id">{{ input.label }}</FormLabel>
        <input 
            v-if="input.id !== 'price'"
            :id="input.id"
            :type="input.type"
            :name="input.id"
            :value="input.value"
            class="p-3 border-2 border-slate-200 rounded-md text-slate-500 focus:outline-none"
        >

        <div
            v-if="input.id === 'price'" 
            class="flex w-full rounded-md overflow-hidden"
        >
            <div class="flex items-center justify-center bg-green-400">
                <label for="price" class="text-white cursor-pointer px-3">
                    Rp
                </label>
            </div>
            <input 
                id="price" 
                name="price" 
                type="number" 
                class="p-4 border focus:outline-none text-slate-500 border-l-0 border-r-green-400 border-y-green-400 flex-[1]"
                :value="input.value"
            >
        </div>
        <p 
            v-if="error" 
            class='text-red-400 text-sm' 
            :class="errorShake && 'errorShake'"
        >{{ error.message }}</p>
    </div>
</template>