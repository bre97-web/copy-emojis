<template>
    <div class="space-y-16">
        <SearchInput></SearchInput>
        <EmojiSet :row="false">
            <SearchResult v-if="search.getKeyword.length !== 0" :emojis="(favorite.getFavorites)"></SearchResult>
            <template v-else>
                <EmojiCard v-for="e in favorite.getFavorites" :emoji="e"></EmojiCard>
            </template>
        </EmojiSet>
    </div>
</template>

<script setup lang="ts">
import EmojiSet from '@/components/EmojiSet.vue';
import EmojiCard from '@/components/EmojiCard.vue';
import { useFavoriteStore } from '@/store/useFavoriteStore'
import { useSearchStore } from '@/store/useSearchStore'
import SearchResult from '@/components/SearchResult.vue'
import SearchInput from './SearchInput.vue'

const favorite = useFavoriteStore()
const search = useSearchStore()
</script>

<style scoped>

</style>