<template>
    <div data-state="reverse" class="elevation rounded-xl w-full md:max-w-md">
        <md-elevation></md-elevation>
        <input class="w-full outline-none rounded-xl px-4 py-2 text-[var(--md-sys-color-on-surface)] bg-[var(--md-sys-color-surface-container)]" type="search" v-model="search.keyword" placeholder="Search Emojis" />
    </div>
</template>

<script setup lang="ts">
import { useSearchStore } from '@/store/useSearchStore'

const search = useSearchStore()
</script>

<style scoped>

</style>