<script>
import SummaryModal from '../components/SummaryModal.vue'
import Banner from '../components/home/Banner.vue';
export default {
    props: ['data'],
    components: {
        SummaryModal,
        Banner
    }
}
</script>

<template>
    <div class="flex  flex-col gap-6">
        <Banner/>
        <div class="flex gap-3">
            <SummaryModal title="Total Lodging" icon="ic:round-house" :content="data.lodgings?.length" backgroundColor="bg-emerald-300"/>
            <SummaryModal title="Total Types" icon="ri:shapes-fill" :content="data.types?.length" backgroundColor="bg-amber-300"/>
            <SummaryModal title="Total Users" icon="material-symbols:supervisor-account" :content="data?.userCount" backgroundColor="bg-sky-300"/>
        </div>
    </div>
</template>