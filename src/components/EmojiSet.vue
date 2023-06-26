<template>
    <ul :class="!props.row ? 'flex flex-wrap flex-col md:flex-row gap-4' : 'space-y-8'">
        <slot></slot>
    </ul>
</template>

<script setup lang="ts">
const props = defineProps<{
    row: boolean
}>()
</script>

<style scoped>

</style>