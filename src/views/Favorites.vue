<template>
    <div>
        <main>
            <EmojiSet :row="false">
                <EmojiCard v-for="e in favorite.getFavorites" :emoji="e"></EmojiCard>
            </EmojiSet>
            <template v-if="favorite.getFavorites.length === 0">
                <div class="text-center space-y-4">
                    <h1 class="text-9xl">👀</h1>
                    <p class="text-lg italic">It's nothing</p>
                </div>
            </template>
        </main>
    </div>
</template>

<script setup lang="ts">
import EmojiSet from '@/components/EmojiSet.vue';
import EmojiCard from '@/components/EmojiCard.vue';
import { useFavoriteStore } from '@/store/useFavoriteStore'

const favorite = useFavoriteStore()
</script>

<style scoped>

</style>