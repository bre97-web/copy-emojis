<template>
    <div class="fixed left-8 bottom-8 space-y-2">
        <div v-for="e in event.getEvents" :key="e.index" class="event shadow rounded-xl surface px-4 py-2">
            <h1 class="surface">{{ e.msg }}</h1>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useEventStore } from '@/store/useEventStore'

const event = useEventStore()
</script>

<style scoped>
.event {
    animation: opacity 5s;
    opacity: 0;
}
@keyframes opacity {
    0% {
        opacity: 0;
    } 30% {
        opacity: 1;
    } 100% {
        opacity: 0;
    }
}
</style>