<template>
    <div class="space-y-16">
        <EmojiChipSet :types="types" :push-current-type="pushCurrentType"></EmojiChipSet>

        <div>
            <EmojiSet :row="!isSingleType">
                <template v-if="isSingleType">
                    <EmojiCard v-for="(e, index) in filter" :key="index" :emoji="e"></EmojiCard>
                </template>
                <template v-else>
                    <li v-for="(title, index) in currentTypes" :key="index" class="flex flex-col gap-4">
                        <h1 class="font-bold text-4xl text-primary">{{ title }}</h1>
                        <ul class="flex flex-row items-stretch gap-4 overflow-x-scroll pl-2 py-4">
                            <EmojiCard v-for="(e, index) in singleFilter(title)" :key="index" :emoji="e"></EmojiCard>
                        </ul>
                    </li>
                </template>
            </EmojiSet>
        </div>

        <nav class="flex items-center justify-end">
            <md-tonal-button @click="increase">More</md-tonal-button>
        </nav>
    </div>
</template>

<script setup lang="ts">
import { Emoji, useEmojiStore } from '@/store/useEmojiStore'
import { computed, ref } from 'vue'
import EmojiCard from './EmojiCard.vue'
import EmojiChipSet from './EmojiChipSet.vue'
import EmojiSet from './EmojiSet.vue'


const emojiStore = useEmojiStore()

/**
 * chip-set 过滤器
 */
const types = computed(() => emojiStore.getTypes().value)
const currentTypes = ref<string[]>([])
const pushCurrentType = (type: string) => {
    if (currentTypes.value.includes(type)) {
        currentTypes.value.splice(currentTypes.value.indexOf(type), 1)
    } else {
        currentTypes.value.push(type)
    }
}
const isSingleType = computed<boolean>(() => currentTypes.value.length <= 1)

const filter = computed<Emoji[]>(() => {
    let emojis: Emoji[] = []
    if (currentTypes.value.length === 0) {
        emojiStore.getEmojis().value.forEach(e => emojis.push(...e))
    } else if (emojiStore.getEmojis().value.has(currentTypes.value[0])) {
        emojis.push(...emojiStore.getEmojis().value.get(currentTypes.value[0]) as Emoji[])
    }
    return emojis.splice(0, currentMaxIndex.value)
})
const singleFilter = (type: string) => {
    let emojis: Emoji[] = []
    if (emojiStore.getEmojis().value.has(type)) {
        emojis.push(...emojiStore.getEmojis().value.get(type) as Emoji[])
    }
    return emojis.splice(0, currentMaxIndex.value)
}

/**
 * 页面显示的最大emoji数量
 * 它在 filter() 和 singleFilter() 中被使用
 */
const currentMaxIndex = ref(50)
const increase = () => {
    currentMaxIndex.value = currentMaxIndex.value + 25
}
</script>

<style scoped></style>