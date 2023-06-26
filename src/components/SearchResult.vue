<template>
    <EmojiCard v-for="(e, index) in filter" :key="index" :emoji="e"></EmojiCard>
</template>

<script setup lang="ts">
import { Emoji } from '@/store/useEmojiStore'
import { useSearchStore } from '@/store/useSearchStore'
import { computed } from 'vue'
import EmojiCard from './EmojiCard.vue'

const props = defineProps<{
    emojis: Emoji[]
}>()
const getAllEmojis = computed<Emoji[]>(() => props.emojis)

const search = useSearchStore()

const filter = computed(() => {
    let res: Emoji[] = []
    if(search.getKeyword.length !== 0) {
        getAllEmojis.value.forEach(e => {
            if(e.name.includes(search.getKeyword.toLowerCase())) {
                res.push(e)
            }
        })
    }
    console.log(props.emojis);
    
    return res
})
</script>

<style scoped>

</style>