<script>
import { Icon } from '@iconify/vue';
export default {
    components: {
        Icon
    },
    props: ['icon', 'class', 'text']
}
</script>
<template>
    <div :class="this.class" class="flex items-center gap-2">
        <Icon :icon="icon"/>
        <p>{{ text }}</p>
    </div>
</template>