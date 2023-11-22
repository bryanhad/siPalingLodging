<script>
export default {
    props: ['history']
}
</script>

<template>
    <tr class="h-[60px]">
        <td>{{ history.id }}</td>
        <td>{{ history.title }}</td>
        <td>
            <p class="min-w-[160px]">
                {{ history.description }}
            </p>
        </td>
        <td>{{ history.updatedBy }}</td>
    </tr>
</template>