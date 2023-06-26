<template>
    <div>
        <main>
            <ShowFavoriteEmojis></ShowFavoriteEmojis>
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
import { useFavoriteStore } from '@/store/useFavoriteStore'
import ShowFavoriteEmojis from '@/components/ShowFavoriteEmojis.vue'

const favorite = useFavoriteStore()
</script>

<style scoped>

</style>