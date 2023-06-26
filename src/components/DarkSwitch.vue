<template>
    <div>
        <md-switch ref="darkSwicthRef" icons="true" @click="darkStore.toggleDark()"></md-switch>
    </div>
</template>

<script setup lang="ts">
import { useDarkStore } from '@/store/useDarkStore'
import { onMounted, ref } from 'vue';

const darkStore = useDarkStore()
const darkSwicthRef = ref()

onMounted(() => {
    darkSwicthRef.value.selected = darkStore.getIsDark().value
})
</script>

<style scoped>

</style>