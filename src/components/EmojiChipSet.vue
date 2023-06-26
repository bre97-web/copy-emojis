<template>
    <md-chip-set type="filter">
        <md-filter-chip v-for="e in props.types" :label="e" @click="props.pushCurrentType(e)"></md-filter-chip>
    </md-chip-set>
</template>

<script setup lang="ts">

const props = defineProps<{
    types: string[],
    pushCurrentType: (e: string) => void
}>()
</script>

<style scoped>

</style>