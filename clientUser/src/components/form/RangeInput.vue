<script>
export default {
    props: ['label', 'inputValue', 'show'],
    data() {
        return {
            data: this.inputValue
        }
    }
}
</script>

<template>
    <div>
        <label for="default-range" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Default range: </label>
        <p v-text="show"></p>
        <input v-model="data"
            id="startingPrice" 
            type="range"
            min="0"
            max="20"
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        >
    </div>
</template>