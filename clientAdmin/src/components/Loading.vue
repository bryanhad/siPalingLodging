<script>
import { Icon } from '@iconify/vue';

export default {
    props: ['class'],
    components: {
        Icon
    }
}
</script>

<template>
    <Icon icon="mingcute:loading-fill" class="animate-spin opacity-50" :class="class"/>
</template>