<template>
    <li class="w-full md:w-auto flex-1 p-2 border dark:border-gray-500 rounded-xl flex flex-col items-center justify-between surface elevation" data-state="reverse">
        <md-elevation></md-elevation>
        <div class="flex flex-col items-center justify-center w-full space-y-8">
            <h1 ref="icon" class="text-8xl lg:text-9xl">{{ props.emoji.emoji }}</h1>
            <p class="text-xs text-secondary">{{ props.emoji.name }}</p>
        </div>
        <div class="action opacity-25 hover:opacity-100 flex justify-end items-end self-end mt-4">
            <md-standard-icon-button @click="favorite.toggle(props.emoji)">
                <md-icon :class="{ 'text-red-500': favorite.getFavorites.includes(props.emoji) }">favorite</md-icon>
            </md-standard-icon-button>
            <md-standard-icon-button @click="copy">
                <md-icon>content_copy</md-icon>
            </md-standard-icon-button>
        </div>
    </li>
</template>

<script setup lang="ts">
import { Emoji } from '@/store/useEmojiStore'
import { useEventStore } from '@/store/useEventStore'
import { useFavoriteStore } from '@/store/useFavoriteStore'
import { ref } from 'vue'

const props = defineProps<{
    emoji: Emoji
}>()

const icon = ref()

const favorite = useFavoriteStore()
const event = useEventStore()

const copy = () => {
    navigator.clipboard.writeText(icon.value.innerText).then(() => {
        event.push({
            msg: `The Emoji ${icon.value.innerText} to be copied.`
        })
    }, () => {
        console.error('Failed to copy');
    });
}
</script>

<style scoped>
div.action {
    transition: all 0.25s;
}
</style>