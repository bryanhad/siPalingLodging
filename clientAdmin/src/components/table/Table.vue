<script>
export default {
    props: ['data', 'headers'],
}
</script>

<template>
    <div class="overflow-x-auto bg-white shadow-sm">
        <table class="table table-zebra">
            <slot name="colGroup"></slot>
            <thead>
                <tr>
                    <th 
                        v-for="(header, i) of headers"
                        :key="i"    
                    >{{ header }}</th>
                </tr>
            </thead>
            <tbody>
                <slot name="tableRow"></slot>
            </tbody>
        </table>
    </div>
</template>